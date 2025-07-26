import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { DocumentStatus } from "@/enums";
import { revalidatePath } from "next/cache";
import { createChunks } from "@/utils/documents/chunking";
import { storeChunksInDB } from "@/utils/documents/storeChunksInDB";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import pinecone from "@/lib/pinecone";
import { nameSpaceExists } from "@/utils/documents/namespaceExists";

// Constants for optimization
const MAX_CONCURRENCY = 5; // Maximum number of concurrent embedding operations

// Main embedding generation function
export const embeddingsGeneration = inngest.createFunction(
  { id: "embeddingsGeneration", concurrency: MAX_CONCURRENCY },
  { event: "test/embeddings.Generation" },
  async ({ event, step }) => {
    const { docId } = event.data;

    try {
      const chunks = await step.run(
        "Download Document and create chunks",
        async () => {
          return await createChunks(docId);
        }
      );

      const generateEmbeddingsResponse = await step.run(
        "Generate embeddings",
        async () => {
          let pineconeVectorStore;

          const embeddings = new GoogleGenerativeAIEmbeddings();

          if (!process.env.PINECONE_INDEX_NAME) {
            throw new Error("PINECONE_INDEX_NAME is not defined");
          }

          const index = await pinecone.index(process.env.PINECONE_INDEX_NAME);

          if (!index) {
            throw new Error("INDEX_NAME is not defined");
          }
          //Check if namespace already exists
          const nameSpaceAlreadyExists = await nameSpaceExists(index, docId);

          if (nameSpaceAlreadyExists) {
            pineconeVectorStore = await PineconeStore.fromExistingIndex(
              embeddings,
              {
                pineconeIndex: index,
                namespace: docId,
              }
            );
            return pineconeVectorStore;
          } else {
            //Create namespace
            pineconeVectorStore = await PineconeStore.fromDocuments(
              chunks,
              embeddings,
              {
                pineconeIndex: index,
                namespace: docId,
              }
            );
            return pineconeVectorStore;
          }
        }
      );

      const storeEmbeddingsResponse = await step.run(
        "Store embeddings",
        async () => {
          return await storeChunksInDB(chunks, docId);
        }
      );

      await step.run("Update document status", async () => {
        await prisma.document.update({
          where: { id: docId },
          data: { status: DocumentStatus.READY },
        });
      });

      return {
        success: true,
        message: "Embeddings generated successfully",
      };
    } catch (error) {
      // Handle errors and update status
      return await step.run("Handle error", async () => {
        console.error(
          `Error generating embeddings for document ${docId}:`,
          error
        );

        await prisma.document.update({
          where: { id: docId },
          data: { status: DocumentStatus.FAILED },
        });

        return { success: false, error: "Failed to generate embeddings" };
      });
    }
  }
);
