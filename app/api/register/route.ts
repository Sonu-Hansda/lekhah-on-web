import {  PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

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
                const new_user = await prisma.user.create(
                    {
                        data:{
                            email:email,
                            firstName:firstname,
                            lastName:lastname,
                            gender:gender,
                            password_hash:hash_password
                        }
                    }
                );
                return new NextResponse("Account created.",{status:201});

            } catch (err){
                return new NextResponse("Unknown error occurred.",{status:400});
            }
       }
        
}

