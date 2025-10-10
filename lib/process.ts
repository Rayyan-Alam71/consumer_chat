import { PineconeStore } from "@langchain/pinecone"
import type { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { chatModel, embeddingModel } from "./model";
import { pinecone } from "./pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";


const customTemplate = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say "thanks for asking!" at the end of the answer.

{context}

Question: {question}

Answer:`;



export async function perfromChunkingAndEmbedding(filepath : string, namespace_id : string){

    try {
        const loader = new PDFLoader(filepath)
        const docs : Document<Record<string, any>>[]= await loader.load()
        console.log('docs')
        console.log(docs)
        
        // split the docs into chunks
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkOverlap : 200,
            chunkSize : 500
        })
    
        const splitDocs = await textSplitter.splitDocuments(docs)
        const text = splitDocs.map((doc) => doc.pageContent)
    
        // create embeddings and store them in the vector db
        const embeddingResponse = await embeddingModel.embedDocuments(text)
        console.log(embeddingResponse)

        const vectorStore = await PineconeStore.fromExistingIndex(embeddingModel, {
            pineconeIndex : pinecone,
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
        const vectorStore = await PineconeStore.fromExistingIndex(embeddingModel, {
            pineconeIndex : pinecone,
            namespace : "user_id_namespace"
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
        console.log(contextDocs)
        
        // const llm_response = await ragChain.invoke({
        //     question : user_query,
        //     context : contextDocs
        // })
        const llm_response = await chain.invoke({question : user_query, context : context})
        console.log(llm_response)

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