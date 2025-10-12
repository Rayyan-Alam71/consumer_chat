import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {v4 as uuid4} from "uuid"
import { client } from "@/lib/model";

export async function GET(req : NextRequest){
    
    const accessKeyId = process.env.AWS_KEY_ID;
    const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
    const s3BucketName = process.env.AWS_S3_BUCKET_NAME;

    if(!accessKeyId || !secretAccessKey || !s3BucketName){
        return NextResponse.json({
            success : 'error',
            msg : 'invalid access keys',
            data :[]
        })
    }

    const searchParams = req.nextUrl.searchParams
    const filename = searchParams.get("fileName")
    const content_type = searchParams.get("ContentType")

    const filename_key = `${filename}-userid-${uuid4()}`
    if(!filename || !content_type){
        return NextResponse.json({
            success : 'error',
            msg : 'invalid file format',
            data : []
        })
    }

    // make a S3 client
    

    const command = new PutObjectCommand({
        Bucket : s3BucketName,
        Key : filename_key,
        ContentType : content_type
    })

    // generate a presigned url
    const presignedUrl = await getSignedUrl(
        client,
        command,
        {expiresIn : 3600} // seconds after this url expires
    )
    if (presignedUrl) return NextResponse.json({
        success : true,
        msg : 'presigned url generated',
        data : [{
            presignedUrl,
            key : filename_key
        }] 
    });
    return new Response(null, { status: 500 });
}