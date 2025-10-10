'use server'
import {v4 as uuid4} from "uuid"
import { prisma } from "@/db/prisma";
import { BotData } from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/db/auth";
import pdfParse from "pdf-parse";
import { GetObjectAclCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { client } from "@/lib/model";
import axios from "axios";
import fs from "fs/promises"
import path from "path";
import { perfromChunkingAndEmbedding } from "@/lib/process";

// preprocess the file, and store the embedding under the namespace , and then store the info in the db

export async function getS3ObjectContent(key : string, filename : string){
    try {
        const command = new GetObjectCommand({
            Bucket : process.env.AWS_S3_BUCKET_NAME!,
            Key : key
        });

        const response = await client.send(command)
        const content = await response.Body?.transformToByteArray()
        const filePath = path.join(process.cwd(), 'uploads', `${filename}-${uuid4()}.pdf`)
        // @ts-ignore
        await fs.writeFile(filePath, content ,(err)=>{
            if(err) console.log('error occurred')
            console.log('files written')
        })
        console.log(filePath)
        return filePath
    } catch (error) {
        console.error(error)
        return ""
    }
}

export async function fetchPdf(key : string, filename :string){
    const filepath = await getS3ObjectContent(key, filename )
    if(filepath ==="") return
    const namespace = `${process.env.NAMESPACE_KEY}-${filename}`
    const res = await perfromChunkingAndEmbedding(filepath, namespace)

    if(res) return {
        namespace : namespace
    }
    else return false
}

export async function addBotInfo(botData : BotData){
    const session = await getServerSession(authOptions)
    
    if(!session?.user){
        throw new Error("User not authenticated")
    }

    const {name, filekey, description, filename} = botData
    const resFromProcessingFile = await fetchPdf(filekey, filename)

    if(!resFromProcessingFile) return

    const res = await prisma.bot.create({
        data  : {
            // @ts-ignore
            userId : session.user.id,
            name, 
            description,
            filekey,
            filename,
            namespace : resFromProcessingFile.namespace
        }
    })

    if(res){
        console.log('data saved in the db')
    }
}