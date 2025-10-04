import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
   apiKey : process.env.PINECONE_API_KEY || 'pcsk_3tG8NP_K6w9sK4zGDJQ6yR38o6DDoXAjKN4oexFZF58VarYPqiKuV2ySysCZGFLsRMe1T1'
});
export const pinecone = pc.index(process.env.PINECONE_INDEX || 'documind');