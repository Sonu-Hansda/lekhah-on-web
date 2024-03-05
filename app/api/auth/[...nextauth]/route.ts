import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

// const authOptions:AuthOptions = {
//     providers: [
//       CredentialsProvider({
//           type: "credentials",
//           name: "credentials",
//           credentials:{email:{},password:{}},
//           async authorize(credentials, req) {
        
//                             const {email,password} = credentials as {email:string,password:string};
//                             if (!email || !password){
//                                return null;
//                             }
                            
//                             const user = await db.user.findUnique({
//                                 where:{email:email}
//                             });
                            
//                             if (!user){
//                                 return null;
//                             }
//                             const valid = await bcrypt.compare(password,user.password_hash);
                                
//                             if (!valid){
                                
//                                 return null;
                                
//                             }else{

//                                 return {id:user.id,email:user.email};
//                             };
                             
//                         }
//       }),
//     ],
  
//     adapter: PrismaAdapter(db),
//     secret: process.env.NEXTAUTH_SECRET,
//     session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  
//     jwt: {
//       secret: process.env.NEXTAUTH_SECRET,
//     },
  
//     pages: {
//       signIn: "/login",
//     },
  
//     callbacks: {
//       async session({session,token,user}) {
//         if (user !== null) {
          
//           session.user = user.;
//         }
//         return  session;
//       },
  
//       async jwt({ token, user }) {
//          return  token;
//       },
//     },
//   };
  
// const handler = NextAuth(authOptions);
const handler = NextAuth({
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
                return user;
                 
            }
        })
    ]
    
});

export {handler as GET , handler as POST}