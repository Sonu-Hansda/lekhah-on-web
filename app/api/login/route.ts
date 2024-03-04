import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const KEY = process.env.JWT_KEY;

export async function POST(req:NextRequest,res:NextResponse){
        const {email,password} = await req.json();
        const user = await prisma.user.findFirst({
            where:{email:email}
        });
        if (user){
            if ( await bcrypt.compare(password,user.password_hash) ){

                const payload = {
                    id: user.id,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    gender: user.gender
                }
                // jwt.sign(payload, KEY ,{expiresIn:"1d"});

                return new NextResponse("Success",{status:200});
            }else{
                return new NextResponse("Invalid credentials",{status:401});
            }
        }else{
            return new NextResponse("Not found",{status:404});
        }
        
}