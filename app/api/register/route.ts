import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req:NextRequest,res:NextResponse){
        const {firstname,lastname,gender,email,password} = await req.json();
        const salt_rounds = 5;
        const hash_password = await bcrypt.hash(password,salt_rounds);
        const user = await prisma.user.findFirst({
            where:{email:email}
        });
        console.log(user);
        
       if (user){
        return new NextResponse("User already exists",{status:403});
       }else{
        
            try{
                 await prisma.user.create(
                    {
                        data:{
                            email:email,
                            firstname:firstname,
                            gender:gender,
                            lastname:lastname,
                            password_hash: hash_password
                           
                        }
                    }
                );
                return new NextResponse("Account created.",{status:201});

            } catch (err){
                return new NextResponse("Unknown error occurred.",{status:400});
            }
       }
        
}

