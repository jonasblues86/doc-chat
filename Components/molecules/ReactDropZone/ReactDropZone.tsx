"use client";
import Icon from "@/Components/atoms/Icons/Icon";
import Toast from "@/Components/atoms/Toast/Toast";
import { uploadDocuments } from "@/app/services/documents/uploadDocuments";
import { IconVariant, ToastVariant } from "@/enums";
import { useSession } from "next-auth/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { generateEmbeddings } from "@/app/services/inngest/generateEmbeddings";
const ReactDropZone = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userId = session?.user.id;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!userId) {
        toast.custom((t) => (
          <Toast
            variant={ToastVariant.ERROR}
            message={"Please login to upload documents"}
          />
        ));
        return;
      }

      try {
        const file = acceptedFiles[0];
        const { success, message, data } = await uploadDocuments({
          userId,
          file,
        });

        if (!success) {
          toast.custom((t) => (
            <Toast variant={ToastVariant.ERROR} message={message} />
          ));
          return;
        }
        toast.custom((t) => (
          <Toast variant={ToastVariant.SUCCESS} message={message} />
        ));
        // Refresh the page to show the new document
        router.refresh();

        if (!data?.id) return;
        // Start embedding generation in background without awaiting
        const response = await generateEmbeddings(data.id);

        if (!response) {
          toast.custom((t) => (
            <Toast
              variant={ToastVariant.ERROR}
              message={"Something went wrong"}
            />
          ));
          return;
        }
        toast.custom((t) => (
          <Toast
            variant={ToastVariant.SUCCESS}
            message={"Embeddings generated successfully"}
          />
        ));
      } catch (error) {
        toast.custom((t) => (
          <Toast
            variant={ToastVariant.ERROR}
            message={"Something went wrong"}
          />
        ));
      }
    },
    [userId]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="group flex mt-2 flex-col items-center justify-center gap-2 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
    >
      <input {...getInputProps()} />
      {status === "loading" ? (
        <span>Loading...</span>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center gap-2 group-hover:text-indigo-500">
          <p>Drag 'n' drop some files here, or click to select files</p>
          <Icon
            variant={IconVariant.UPLOAD}
            height={20}
            width={20}
            stroke="black"
          />
        </div>
      )}
    </div>
  );
};

export default ReactDropZone;
