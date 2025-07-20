import { prisma } from "@/lib/prisma";

export const downloadDocument = async (docId: string) => {
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
  return response;
};
