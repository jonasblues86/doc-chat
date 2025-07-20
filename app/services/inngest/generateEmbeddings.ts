"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { inngest } from "@/inngest/client";
import { revalidatePath } from "next/cache";

export const generateEmbeddings = async (docId: string) => {
  const session = await getServerSession(authOptions);
  // If no session
  if (!session?.user.id) {
    return {
      success: false,
      message: "User not found",
    };
  }

  // calling inngest to generate embeddings
  const response = await inngest.send({
    name: "test/embeddings.Generation",
    data: {
      docId,
    },
  });
  // Revalidate dashboard page
  revalidatePath("/dashboard");
  //Failed to generate embeddings
  if (!response) {
    return {
      success: false,
      message: "Failed to generate embeddings",
    };
  }
  //Embeddings generated successfully
  return {
    success: true,
    message: "Embeddings generated successfully",
  };
};
