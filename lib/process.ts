'use server'
import { PineconeStore } from "@langchain/pinecone"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { chatModel, embeddingModel } from "./model";
import { getPineconeIndex } from "./pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const customTemplate = `You are an AI assistant embedded on a website. 
Your goal is to help visitors by answering their questions clearly, accurately, and politely. 
Use the provided context below to answer the user's question. 

Guidelines:
- Base your answer strictly on the given context — do not invent information.  
- If the context doesn’t contain enough details, say you don’t know or that the information is unavailable.  
- Keep your answer concise and conversational — ideally within 2–3 sentences.  
- End every response with “Thanks for asking!”  

Context:
{context}

User Question: {question}

Answer:`;



export async function perfromChunkingAndEmbedding(content : string, namespace_id : string){

    try {
        // split the docs into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkOverlap : 200,
            chunkSize : 500
        })
    
        const splitDocs = await textSplitter.createDocuments([content])
        // const text = splitDocs.map((doc) => doc.pageContent)
    
        // // create embeddings and store them in the vector db
        // const embeddingResponse = await embeddingModel.embedDocuments(text)
        // console.log(embeddingResponse)

        const pineconeIndex = await getPineconeIndex();
        const vectorStore = await PineconeStore.fromExistingIndex(embeddingModel, {
            pineconeIndex,
            namespace : namespace_id
        })
    
        await vectorStore.addDocuments(splitDocs)
        console.log("embeddings added to the index")
        return true
    } catch (error) {
        console.log(error)
        return false
    }

}

export async function runRAGPipeline(namespace_id : string, user_query : string){
    try {
        const pineconeIndex = await getPineconeIndex();
        const vectorStore = await PineconeStore.fromExistingIndex(embeddingModel, {
            pineconeIndex,
            namespace : namespace_id
        })
        
        const retriever = vectorStore.asRetriever({
            k : 2
        })

        const customRagPromptTemplate = PromptTemplate.fromTemplate(customTemplate)

        // const ragChain = await createStuffDocumentsChain({
        //     llm : chatModel,
        //     outputParser : new StringOutputParser(),
        //     prompt : customRagPromptTemplate
        // })
        const outputParser = new StringOutputParser()

        const chain = customRagPromptTemplate.pipe(chatModel).pipe(outputParser)
        const contextDocs = await retriever.invoke(user_query)
        const context = contextDocs.map((docs) => docs.pageContent).join("\n\n")
        // console.log(contextDocs)
        
        // const llm_response = await ragChain.invoke({
        //     question : user_query,
        //     context : contextDocs
        // })
        const llm_response = await chain.invoke({question : user_query, context : context})
        // console.log(llm_response)

        return {
            ai_res : llm_response
        }
    } catch (error) {
        console.log(error)
        return {
            ai_res : "error occurred"
        }
    }
}

