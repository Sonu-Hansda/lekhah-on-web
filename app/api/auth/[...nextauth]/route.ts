import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

const handler = NextAuth({
    adapter:PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt",
    },
    pages:{
        signIn:"/login",
    },
    providers:[
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {
                email:{},
                password:{}
            },
            authorize:async (credentials,req) => {
                
                if (!credentials?.email || !credentials.password){
                    return null;
                }
                
                const user = await db.user.findUnique({
                    where:{email:credentials?.email}
                });

                if (!user){
                    return null ;
                }
                const valid = bcrypt.compare(credentials.password,user.password_hash);

                if (!valid){
                    console.log("Invalid user or password");
                    
                    return null
                };
                return {id:user.id,email:user.email};
                 
            }
        })
    ]
});

export {handler as GET , handler as POST}