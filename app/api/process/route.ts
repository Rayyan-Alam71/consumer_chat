import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import path from "path";
import { perfromChunkingAndEmbedding } from "@/lib/process";
import type { Document } from "@langchain/core/documents";
export async function GET(req : NextRequest){
    // check if the user is authenticated/valid

    // get the pdf data and perform chunking
    try {
        const pdf_filepath = path.join(process.cwd(), "public", "sample.pdf")
        const loader = new PDFLoader(pdf_filepath)
        const docs : Document<Record<string, any>>[]= await loader.load()
    
        // perform chunking, create embeddings and store in the pinecone
        const user_namespace = "user_id_namespace"
        await perfromChunkingAndEmbedding(docs, user_namespace)
        return NextResponse.json({
            success : true,
            msg : 'process completed',
            data : [{
                namespace : "user_id"
            }]
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success : false,
            msg : 'error occurred',
            data : []
        })        
    }
}