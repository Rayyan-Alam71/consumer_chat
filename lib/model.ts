import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"


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