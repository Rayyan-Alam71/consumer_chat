'use server'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { unlink, writeFile } from 'fs/promises';
import path from "path";
import PDFParser from 'pdf2json';
import fs from "fs/promises"
import PdfParse from 'pdf-parse';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Key } from 'lucide-react';
import { client } from '@/lib/model';

export async function handleUpload(formData : FormData){
    const file = formData.get("file") as File;
    if(!file) throw new Error("No file uploaded")

    try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = path.join(process.cwd(), 'uploads', file.name).replace(/\\/g, '/');       

        // write the content of the file in local
        await writeFile(filePath, buffer)
        console.log(JSON.stringify({
            success : true,
            filePath
        }))

        // parse the file and get the content

        const parsedData = parsePDF(filePath)
        console.log(parsedData)
        // once the parsing is done, delete the file from the local storage
        await unlink(filePath)

        console.log('file unlinked')
    } catch (error) {
        console.log(error)
    }
}
export async function parsePDF(filePath : string){
    // create a pdf parser object
    const parser = new PDFParser()

    let pdfData = "";

    parser.on('pdfParser_dataError', (err) =>{
        console.log(err)
        throw new Error("error while parsing")
    })

    parser.on('pdfParser_dataReady', (data)=>{
        data.Pages[0].Texts.map((text : any, i)=>{
            console.log(text)
        })
        // pdfData = data.Pages[0].Texts
    })
    await parser.loadPDF(filePath)
    console.log(pdfData);
    
    await unlink(filePath)
    return pdfData
}

// this is for testing purpose, to check why is PDFLoader not working 
export async function callScript(){
    const command = new GetObjectCommand({
        Bucket : process.env.AWS_S3_BUCKET_NAME!,
        Key : "delete_it.txt-userid-1bbc0d70-777d-420b-83db-6ff7410116c2"
    })
    const data = await client.send(command)
    const text = await data.Body?.transformToString()
    console.log(text)
    return text

}