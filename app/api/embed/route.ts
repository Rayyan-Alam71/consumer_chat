import { authOptions } from "@/db/auth";
import { prisma } from "@/db/prisma";
import { client } from "@/lib/model";
import { perfromChunkingAndEmbedding } from "@/lib/process";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid4} from "uuid"


export async function POST(req : NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user){
        throw new Error("User not authenticated")
    }
    console.log(session.user)
    const { botData } = await req.json()
    const  {name, description, filekey, filename} = botData
    console.log(`${name}-${description}-${filekey}-${filename}`)
    if(!name || !description || !filekey || !filename){
        return NextResponse.json({
            success : false,
            data : []
        })
    }
    try {
        
        // fetch the content of the file, embed the document, and store the response in the db
        const text : string = await getFileContent(filekey)
        if(text === "") return
        const namespace = `${filename}-${process.env.NAMESPACE_KEY}-${uuid4()}`
        const preprocessingResponse = await perfromChunkingAndEmbedding(text, namespace)
    
        // save the data in the db
        if(preprocessingResponse){
            // generate a widget token
            // @ts-ignore
            const widgetToken = createWidgetToken(namespace, session.user.id)
            // add in the db
            const dbRes = await prisma.bot.create({
                data : {
                    name : name,
                    filename : filename,
                    filekey : filekey,
                    fileSource : 'to-be-checked',
                    namespace : namespace,
                    description : description,
                    // @ts-ignore
                    userId : session.user.id,
                    widget_token : widgetToken
                }
            })
            if(dbRes){
                return NextResponse.json({
                    success : true,
                    message : 'processed completed'
                })
            }else{
                return NextResponse.json({
                    success : false,
                    message : 'error while saving in the db'
                })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success : false,
            message : 'Error occured => '+error,
            data : []
        })
    }

}

async function getFileContent(filekey : string){
    try {
        const command = new GetObjectCommand({
            Bucket : process.env.AWS_S3_BUCKET_NAME!,
            Key : filekey
        })

        const response = await client.send(command)
        const text = response.Body?.transformToString()
        if(!text) return ""
        return text
    } catch (error) {
        console.log('error occured in getFileContent')
        console.error(error)
        return ""
    }

}

function createWidgetToken(namespace : string, userid : string){
    const payload = {
        namespace,
        userid
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET! )
    return token

}