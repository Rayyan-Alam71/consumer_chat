import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth";

export const authOptions = {
    adapter : PrismaAdapter(prisma),
    session : {
        strategy : "jwt"
    },
    providers : [
        GoogleProvider ({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,   
        })
    ],
    secret : process.env.JWT_SECRET || 'secret',
    callbacks :  {
        async jwt({ token}){
            const dbUser = await prisma.user.findFirst({
                where : {
                    email : token.email
                }
            })
            if(!dbUser){
                throw new Error('No user found')
            }
            return {
                id : dbUser.id,
                name : dbUser.name,
                email : dbUser.email,
                picture : dbUser.picture
            }
        },

        async session({token, session}){
            if(token){
                session.user = {
                    // @ts-ignore
                    id : token.id as string,
                    name : token.name,
                    email : token.email,
                    image : token.picture
                }
            }
            return session
        }
    }

} as AuthOptions