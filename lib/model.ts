import { S3Client } from "@aws-sdk/client-s3"
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"

const accessKeyId = process.env.AWS_KEY_ID!;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY!;

export const embeddingModel = new OpenAIEmbeddings({
    apiKey : process.env.OPENAI_API_KEY!,
    model : "text-embedding-3-small",
    dimensions: 1024
})

export const chatModel = new ChatOpenAI({
    model : "chatgpt-4o-latest",
    temperature : 0.5,
    apiKey: process.env.OPENAI_API_KEY!
})

export const client = new S3Client({
    region : 'eu-north-1',
    credentials : {
        accessKeyId ,
        secretAccessKey
    }
})