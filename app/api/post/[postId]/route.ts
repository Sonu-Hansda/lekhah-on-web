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
  

export async function DELETE(req: NextRequest, res: NextResponse) {
    const id = req.url.split("/")[req.url.split("/").length-1];
    const {userEmail} = await req.json();
    console.log(userEmail);
    
    try{
        const post = await prisma.post.findFirst({where:{id:id},include:{author:true}});
        if (post){
            if (post.author.email == userEmail){
                console.log("delete post");
                return new NextResponse("Deleted",{status:200});
            }else{
                return new NextResponse("Not authorized",{status:401});
            }
            
        }
        return new NextResponse("Post not found",{status:404});

    }catch(e){
        return new NextResponse("Unknown error occurred.",{status:400});
    }
    
  }
  