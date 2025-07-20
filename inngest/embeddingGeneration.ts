import { prisma } from "@/lib/prisma";
import { inngest } from "./client";
import { DocumentStatus } from "@/enums";
import { generateEmbeddingsInPinecone } from "@/lib/langchain";
import { revalidatePath } from "next/cache";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Constants for optimization
const MAX_CONCURRENCY = 5; // Maximum number of concurrent embedding operations

// Main embedding generation function
export const embeddingsGeneration = inngest.createFunction(
  { id: "embeddingsGeneration", concurrency: MAX_CONCURRENCY },
  { event: "test/embeddings.Generation" },
  async ({ event, step }) => {
    const { docId } = event.data;

    try {
      // Get Document Public URL
      await step.run("Get Download URL and Download Document", async () => {
        const document = await prisma.document.findUnique({
          where: { id: docId },
        });
        if (!document) {
          throw new Error("Document not found");
        }
        const downloadUrl = document.fileUrl;
        const response = await fetch(downloadUrl as string);
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const blob = await response.blob();
        const loader = new PDFLoader(blob);
        const docs = await loader.load();
        const splitter = new RecursiveCharacterTextSplitter();
        const splitDocs = await splitter.splitDocuments(docs);
        return splitDocs;
      });

      await step.run("Generate embeddings", async () => {});

      // Update status to READY on success
      return await step.run("Update document status to ready", async () => {
        await prisma.document.update({
          where: { id: docId },
          data: { status: DocumentStatus.READY },
        });

        // Attempt to revalidate dashboard path
        try {
          // This might fail in background context, so we catch errors
          revalidatePath("/dashboard");
        } catch (error) {
          console.log("Could not revalidate path in background context");
        }

        return { success: true };
      });
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
