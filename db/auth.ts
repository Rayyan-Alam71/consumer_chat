// Use the NextAuth-compatible Prisma adapter package
// If you're on next-auth v4, the adapter package should be '@next-auth/prisma-adapter'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../prisma";
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
    // NextAuth expects NEXTAUTH_SECRET in many setups; fall back to JWT_SECRET for compatibility
    secret : process.env.NEXTAUTH_SECRET,
    callbacks :  {
        async jwt({ token}){
                // token may be called before a DB user exists (first sign-in)
                // don't throw here — return the token as-is if we can't find the user
                try {
                    const dbUser = await prisma.user.findFirst({ where: { email: token.email } });
                    if (!dbUser) return token;

                    return {
                        ...token,
                        id: dbUser.id,
                        name: dbUser.name,
                        email: dbUser.email,
                        picture: dbUser.image,
                    };
                } catch (e) {
                    console.error("jwt callback error:", e);
                    return token;
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