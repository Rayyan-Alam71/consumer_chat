import { runRAGPipeline } from "@/lib/process";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req : NextRequest){
    try {
        // check if the user is authenticated/validated

        const { widget_token , user_query } : { 
            // replace this namespace with project_id, and get the namespace from the project_id by querying the db
            widget_token : string,
            user_query : string 
        }= await req.json()

        const decoded = jwt.verify(widget_token, process.env.JWT_SECRET!) 
        // @ts-ignore
        const namespace_id = decoded.namespace
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
            data : [{
                ai_res : "Some error occurred. Sorry for inconvenience."
            }]
        })
    }
}