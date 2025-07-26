import { prisma } from "@/lib/prisma";
import { Document } from "@langchain/core/documents";

export const storeChunksInDB = async (
  chunks: Document<Record<string, any>>[],
  docId: string
) => {
  const chunkData = chunks.map(async (chunk, index) => {
    return await prisma.documentChunk.create({
      data: {
        documentId: docId,

        chunkIndex: index,
        content: chunk.pageContent,
      },
    });
  });
  await Promise.all(chunkData);
  return chunkData;
};
