"use server";

import supabaseServer from "@/utils/supabase/server";
import { ApiResponse } from "../servicesTypes";
import { prisma } from "@/lib/prisma";
import { DocumentStatus } from "@/enums";
import { revalidatePath } from "next/cache";
//Upload Document
export async function uploadDocuments({
  userId,
  file,
}: {
  userId: string;
  file: File;
}): Promise<ApiResponse<{ id: string }>> {
  try {
    if (!file) {
      return {
        success: false,
        message: "File is required",
      };
    }

    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const { publicUrl, uniqueFileName } = await storeFile(file, userId);
    if (!publicUrl) {
      return {
        success: false,
        message: "Failed to upload document",
      };
    }
    const documentData = await updateDocumentRecord({
      file,
      userId,
      publicUrl,
      uniqueFileName,
    });
    if (!documentData) {
      return {
        success: false,
        message: "Failed to upload document",
      };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Document uploaded successfully",
      data: { id: documentData.id },
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

const storeFile = async (file: File, userId: string) => {
  try {
    const supabase = await supabaseServer();
    const uniqueId = crypto.randomUUID();
    const uniqueFileName = `${uniqueId}`;
    const filePath = `${userId}/documents/${uniqueFileName}`;
    const { data, error } = await supabase.storage
      .from(`users`)
      .upload(filePath, file);
    if (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to upload document",
      };
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from(`users`).getPublicUrl(filePath);
    if (!publicUrl) {
      return {
        success: false,
        message: "Failed to get public URL",
      };
    }

    return { publicUrl, uniqueFileName };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

//Update Document Record
const updateDocumentRecord = async ({
  file,
  userId,
  publicUrl,
  uniqueFileName,
}: {
  file: File;
  userId: string;
  publicUrl: string;
  uniqueFileName: string;
}) => {
  try {
    return prisma.$transaction(async (tx) => {
      const document = await tx.document.create({
        //update Document
        data: {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileUrl: publicUrl,
          user: {
            connect: {
              id: userId,
            },
          },
          status: DocumentStatus.PROCESSING,
          uniqueName: uniqueFileName,
        },
      });
      //update User
      const user = await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          storageUsed: {
            increment: file.size,
          },
        },
      });
      return document;
    });
  } catch (error) {
    throw error;
  }
};
