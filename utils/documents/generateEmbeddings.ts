import pinecone from "@/lib/pinecone";
import { Document } from "@langchain/core/documents";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PineconeStore } from "@langchain/pinecone";
import { nameSpaceExists } from "./namespaceExists";

export const generateEmbeddings = async (
  chunks: Document[],
  docId: string
): Promise<PineconeStore | false> => {
  try {
    let pineconeVectorStore;

    const embeddings = new GoogleGenerativeAIEmbeddings();

    if (!process.env.PINECONE_INDEX_NAME) {
      throw new Error("PINECONE_INDEX_NAME is not defined");
    }

    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    if (!index) {
      throw new Error("INDEX_NAME is not defined");
    }
    //Check if namespace already exists
    const nameSpaceAlreadyExists = await nameSpaceExists(index, docId);

    if (nameSpaceAlreadyExists) {
      pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        namespace: docId,
      });
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
  } catch (error) {
    console.log(error);
    return false;
  }
};
