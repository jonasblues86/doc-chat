import { generateEmbeddingsInPinecone } from "@/lib/langchain";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DocumentStatus } from "@/enums";

// Background job function that runs embedding generation asynchronously
export async function generateEmbeddings(docId: string) {
  try {
    console.log(
      `Starting background embedding generation for document ${docId}`
    );

    // Generate embeddings in Pinecone
    const pineconeVectorStore = await generateEmbeddingsInPinecone(docId);

    // Update status to READY on success
    await updateDocumentStatus(docId, DocumentStatus.READY);

    return {
      success: true,
      message: "Embeddings generated successfully",
    };
  } catch (error) {
    console.error(`Error generating embeddings for document ${docId}:`, error);

    // Update status to FAILED on error
    await updateDocumentStatus(docId, DocumentStatus.FAILED);

    return {
      success: false,
      message: "Failed to generate embeddings",
    };
  } finally {
    revalidatePath("/dashboard");
  }
}

const updateDocumentStatus = async (docId: string, status: DocumentStatus) => {
  try {
    await prisma.document.update({
      where: {
        id: docId,
      },
      data: {
        status: status,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
