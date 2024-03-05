import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){
        const {title,description,coverImage,email} = await req.json();
        const user = await prisma.user.findFirst({
            where:{email:email}
        });
        if (user){
        try{
             await prisma.post.create(
               {
                   data:{
                      title:title,
                      content:description,
                      coverUrl:coverImage,
                    authorId: user.id,

                      
                   }
               }
           );
           return new NextResponse("Post created.",{status:201});

       } catch (err){
           return new NextResponse("Unknown error occurred.",{status:400});
       }
            
        }else{
            return new NextResponse("Not found",{status:404});
        }
        
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const posts = (await prisma.post.findMany());
      
      return  NextResponse.json({"posts":posts.reverse()});
    } catch (err) {
      return new NextResponse("Unknown error occurred.", { status: 400 });
    }
  }
  