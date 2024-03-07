import NextAuth, {  NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions:NextAuthOptions = {
    adapter:PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt",
    },
    pages:{
        signIn:"/login"
    },
    providers:[
        CredentialsProvider({
            type: "credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
        
                const {email,password} = credentials as {email:string,password:string};
                if (!email || !password){
                    return null;
                }
                
                const user = await db.user.findUnique({
                    where:{email:email}
                });
                
                if (!user){
                    return null;
                }
                const valid = await bcrypt.compare(password,user.password_hash);

                if (!valid){
                    
                    return null;
                    
                };
                return {
                    id: user.id,
                    email:user.email,
                    name:user.firstname,
                };
                 
            }
        })
    ],
    callbacks:{
        async session({session,user,token}){
            return {
                ...session,
                user:{
                    ...session.user,
                    name:token.name,
                },
            }
        },
        async jwt({ token, user }) {
            if (user) {
              return {
                ...token,
                name: user.name
              }
            }
            return token
          }
    }
}
const handler = NextAuth(authOptions);

export {handler as GET , handler as POST}