import { Index, RecordMetadata } from "@pinecone-database/pinecone";

export const nameSpaceExists = async (
  index: Index<RecordMetadata>,
  docId: string
) => {
  try {
    const { namespaces } = await index.describeIndexStats();
    return namespaces?.[docId] !== undefined;
  } catch (error) {
    return false;
  }
};
