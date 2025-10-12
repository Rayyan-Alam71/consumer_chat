'use server'
// Lazily import the Pinecone client at runtime (server-only) to avoid bundler errors
export async function getPineconeIndex() {
   const { Pinecone } = await import('@pinecone-database/pinecone');
   const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!
   });
   return pc.index(process.env.PINECONE_INDEX!);
}