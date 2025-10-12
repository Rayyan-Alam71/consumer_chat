'use server'
// Lazily import the Pinecone client at runtime (server-only) to avoid bundler errors
export async function getPineconeIndex() {
   const { Pinecone } = await import('@pinecone-database/pinecone');
   const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || 'pcsk_3tG8NP_K6w9sK4zGDJQ6yR38o6DDoXAjKN4oexFZF58VarYPqiKuV2ySysCZGFLsRMe1T1',
   });
   return pc.index(process.env.PINECONE_INDEX || 'documind');
}