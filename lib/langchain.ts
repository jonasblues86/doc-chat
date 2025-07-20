import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pinecone from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PineconeConflictError } from "@pinecone-database/pinecone/dist/errors";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "./authOptions";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { DocumentStatus } from "@/enums";

//Initialize Model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const indexName = "antithesis";

async function generateDocs(docId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return;

  const document = await prisma.document.findUnique({
    where: {
      id: docId,
    },
  });

  if (!document) return;

  //Get Download URL
  const downloadUrl = document.fileUrl;

  //Fetch Document
  const response = await fetch(downloadUrl as string);

  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }

  console.log("------Document Fetched Successfully------");

  //Load PDF into Blob
  const blob = await response.blob();

  console.log("---Loading PDF----");
  const loader = new PDFLoader(blob);

  const docs = await loader.load();

  console.log("---Splitting Documents into Chunks---");
  const splitter = new RecursiveCharacterTextSplitter();

  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`---Split Docs into chunks of length ${splitDocs.length}`);

  return splitDocs;
}

async function nameSpaceExists(
  index: Index<RecordMetadata>,
  namespace: string
) {
  if (namespace === null) return;
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPinecone(docId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return;
  }
  let pineconeVectorStore;
  console.log("---Generating Embeddings in Pinecone---");

  const embeddings = new GoogleGenerativeAIEmbeddings();

  const index = await pinecone.index(indexName);
  const nameSpaceAlreadyExists = await nameSpaceExists(index, docId);

  if (nameSpaceAlreadyExists) {
    console.log("Namespace already exists");
    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });
    return pineconeVectorStore;
  } else {
    //Download Document

    const splitDocs = await generateDocs(docId);

    if (!splitDocs) {
      console.log("Failed to Split docs");
      return;
    }

    console.log(`---Storing the namespace ${docId} into ${indexName}`);

    pineconeVectorStore = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        pineconeIndex: index,
        namespace: docId,
      }
    );
    return pineconeVectorStore;
  }
}

// Background job function that runs without blocking main thread
export async function generateEmbeddingsInBackground(docId: string) {
  try {
    await generateEmbeddingsInPinecone(docId);

    // Update document status to READY after embeddings complete
    await prisma.document.update({
      where: { id: docId },
      data: { status: DocumentStatus.READY },
    });

    console.log(
      `Document ${docId} embeddings generated and status updated to READY`
    );
  } catch (error) {
    console.error(
      `Failed to generate embeddings for document ${docId}:`,
      error
    );

    // Update document status to ERROR on failure
    await prisma.document.update({
      where: { id: docId },
      data: { status: DocumentStatus.FAILED },
    });
  }
}
