import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const id = req.url.split("/")[req.url.split("/").length-1];
    
    try{
        const post = await prisma.post.findFirst({where:{id:id},include:{author:true}});
        return NextResponse.json({"post":post});

    }catch(e){
        return new NextResponse("Unknown error occurred.",{status:400});
    }
    
  }
  