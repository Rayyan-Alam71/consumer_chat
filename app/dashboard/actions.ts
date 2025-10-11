'use server'

import { authOptions } from "@/db/auth"
import { prisma } from "@/db/prisma"
import { getServerSession } from "next-auth"
import { BotInterface } from "./page"

export const fetchBots = async () =>{
    const session = await getServerSession(authOptions)
    if(!session?.user){
        throw new Error("User not authenticated")
    }

    try {
        console.log(session.user)
        const dbBotsRes = await prisma.bot.findMany({
            where : {
                // @ts-ignore
                userId : session.user.id
            }
        })
        console.log("bots")
        console.log(dbBotsRes)
        return dbBotsRes
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function deleteBot(bot : BotInterface){
    const session = await getServerSession(authOptions)
    if(!session?.user) throw new Error("user not validated")
    
    try {
        // @ts-ignore
        if(bot.userId != session.user.id) return
        const res = await prisma.bot.delete({
            where : {
                id : bot.id,
                userId : bot.userId                
            }
        })
    } catch (error) {
        console.log("error while deleting the bot")
        console.error(error)
    }
}

export async function fetchDetail(botId: string){
    try {
        const res = await prisma.bot.findFirst({
            where : {
                id : botId
            }
        })
        return res
    } catch (error) {
        console.log('error while fetching bot data')
        console.error(error)
        return
    }
}