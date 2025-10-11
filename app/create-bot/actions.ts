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

export async function addBotInfo(botData : BotData){
    const session = await getServerSession(authOptions)
    
    if(!session?.user){
        throw new Error("User not authenticated")
    }

    const {name, filekey, description, filename} = botData
    const resFromProcessingFile = await process(filekey, filename)

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