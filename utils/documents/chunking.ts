import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { downloadDocument } from "./downlaodDocument";

export const createChunks = async (docId: string): Promise<Document[]> => {
  try {
    // Validate input
    if (!docId) {
      throw new Error(`Failed to fetch document: Document not found`);
    }

    const document = await downloadDocument(docId);

    if (!document.ok) {
      throw new Error("Document is empty");
    }

    const loader = new PDFLoader(await document.blob());
    const docs = await loader.load();

    if (!docs || docs.length === 0) {
      throw new Error("No documents could be loaded from PDF");
    }

    // Consider making these configurable
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);
    return splitDocs;
  } catch (error) {
    throw new Error(
      `Failed to create chunks: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
