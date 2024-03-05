"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import placeholder from '../../placeholder.jpg';
interface Post {
    authorId:string,
    content:string,
    coverUrl:string,
    createdAt:string,
    id:string,
    title:string,
    updatedAt:string,
    author:{
        email:string,
        firstname:string,
        id:string,
    }
}
function page() {
    const session = useSession();
    const path = usePathname();
    const [post, setPost] = useState<Post>();
    const id = path.split("/")[path.split("/").length-1];
  
    useEffect(() => {
       
      getPost();
   
    }, []);
  
    async function getPost() {
        try {
            const response = await fetch(`/api/post/${id}`);
      
            if (response.status === 200) {
              const data = await response.json();
             console.log({...data.post});
             
              setPost({...data.post})
            } else {
              toast.error(`An unknown error occurred.`);
            }
          } catch (error) {
           
            toast.error(`An error occurred while fetching posts.`);
          }
        
    }
  
  return (
    <div className='w-3/4 mx-auto'>
        <Image priority={true} className="w-3/4 mx-auto" src={post?.coverUrl == undefined || post.coverUrl =="/_next/static/media/placeholder.009bf1fe.jpg"  ?  placeholder : post.coverUrl} alt="Cover Image" />
        <h1 className='text-2xl text-center font-semibold'>{post?.title}</h1>
        <p className='p-4 text-center'>{post?.content}</p>
    </div>
  )
}

export default page