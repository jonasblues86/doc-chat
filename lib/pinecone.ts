import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  /**
   * The API key to use when connecting to Pinecone.
   *
   * The key can be found in your Pinecone dashboard, under the "API Keys"
   * tab. You should set this as an environment variable named
   * `PINECONE_API_KEY`.
   *
   * @example import { pinecone } from '../lib/pinecone';
   * // pinecone.apiKey is now the value of the PINECONE_API_KEY
   * // environment variable.
   *
   * @type {string}
   */
  apiKey: process.env.PINECONE_API_KEY!,
});

export default pinecone;
