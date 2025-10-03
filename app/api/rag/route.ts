import { runRAGPipeline } from "@/lib/process";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        // check if the user is authenticated/validated

        const { namespace_id, user_query } : { 
            // replace this namespace with project_id, and get the namespace from the project_id by querying the db
            namespace_id : string,
            user_query : string 
        }= await req.json()
        const AIRes = await runRAGPipeline(namespace_id, user_query)
        
        console.log(AIRes)

        return NextResponse.json({
            success : true,
            msg : 'process completed',
            data : [{
                ai_res : AIRes
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