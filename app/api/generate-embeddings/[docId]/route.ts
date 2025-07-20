import { NextRequest, NextResponse } from "next/server";
import { generateEmbeddings } from "@/app/services/documents/generateEmbeddings";
import { revalidatePath } from "next/cache";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ docId: string }> }
) {
  const { docId } = await params;

  try {
    if (!docId) {
      return NextResponse.json(
        { message: "Document ID is required", success: false },
        { status: 400 }
      );
    }

    const document = await generateEmbeddings(docId);

    if (!document.success) {
      return NextResponse.json(
        { message: document.message, success: false },
        { status: 500 }
      );
    }

    revalidatePath("/dashboard");

    return NextResponse.json(
      { message: "Document processed successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
