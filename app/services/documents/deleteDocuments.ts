"use server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "../servicesTypes";
import supabaseServer from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const deleteDocuments = async (
  docId: string
): Promise<ApiResponse<null>> => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return {
      success: false,
      message: "User not found",
    };
  }
  const userId = session?.user.id;

  try {
    const documentExists = await prisma.document.findUnique({
      where: { id: docId },
    });

    if (!documentExists) {
      return {
        success: false,
        message: "Document not found",
      };
    }

    const deletedDocument = await prisma.document.delete({
      where: { id: docId },
    });

    const supabase = await supabaseServer();

    const filePath = `${userId}/documents/${deletedDocument.uniqueName}`;
    console.log(filePath, "File Path");

    const { error } = await supabase.storage.from(`users`).remove([filePath]);

    if (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to delete document",
      };
    }

    return {
      success: true,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete document",
    };
  } finally {
    revalidatePath("/dashboard");
  }
};
