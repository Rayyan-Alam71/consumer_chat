import { parsePDF } from "@/app/actions";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req : NextRequest){
    const formData = await req.formData()
    const file = formData.get("file") as File

    if(!file) return NextResponse.json({
        msg : "error",
        data :[]
    })

    try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = path.join(process.cwd(), 'uploads', file.name)

        await writeFile(filePath, buffer)

        const pdf_data = await parsePDF(filePath)
        console.log(pdf_data)
        let res = ''

        pdf_data.map((data, i) => {
            
        })

        return NextResponse.json({
            msg : 'successfull',
            data : [{
                ''.concat() 
            }]
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg : 'error',
            data : []
        })
    }
}