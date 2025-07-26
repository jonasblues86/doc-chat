import { prisma } from "@/lib/prisma";
import { Document } from "@langchain/core/documents";

export const storeChunksInDB = async (
  chunks: Document<Record<string, any>>[],
  docId: string
) => {
  try {
    const chunkPromises = chunks.map((chunk, index) =>
      prisma.documentChunk.create({
        data: {
          documentId: docId,
          chunkIndex: index,
          content: chunk.pageContent,
        },
      })
    );

    const createdChunks = await Promise.all(chunkPromises);
    return createdChunks;
  } catch (error) {
    console.error("Failed to store chunks in database:", error);
    throw error;
  }
};
