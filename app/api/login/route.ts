import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req:NextRequest,res:NextResponse){
        const {email,password} = await req.json();
        const user = await prisma.user.findFirst({
            where:{email:email}
        });
        if (user){
            if ( await bcrypt.compare(password,user.password_hash) ){
                return new NextResponse("Invalid credentials",{status:401});
            }else{
                return new NextResponse("Success",{status:200});
            }
        }else{
            return new NextResponse("Not found",{status:404});
        }
        
}