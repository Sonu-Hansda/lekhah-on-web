import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/user";


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
    const user = await getCurrentUser(); 
    
    try{
        const post = await prisma.post.findFirst({where:{id:id},include:{author:true}});
        if (post){
            if (post.author.email == user?.email){
                await prisma.post.delete({where:{id:id}});
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
  

export async function PATCH(req: NextRequest, res: NextResponse) {
    const id = req.url.split("/")[req.url.split("/").length-1];
    const {title,description,coverImage} = await req.json();
    const user = await getCurrentUser(); 
    
    try{
        const post = await prisma.post.findFirst({where:{id:id},include:{author:true}});
        if (post){

            if (post.author.email == user?.email){
                await prisma.post.delete({where:{id:id}});
                return new NextResponse("Updated successfully!",{status:200});

            }else{

                return new NextResponse("Not authorized",{status:401});

            }
            
        }
        return new NextResponse("Post not found",{status:404});

    }catch(e){
        return new NextResponse("Unknown error occurred.",{status:400});
    }
  }
  