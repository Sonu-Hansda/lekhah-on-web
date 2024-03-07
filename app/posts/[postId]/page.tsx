"use client"

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import placeholder from '../../placeholder.jpg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    const router = useRouter();
    const path = usePathname();
    const [post, setPost] = useState<Post>();
    const id = path.split("/")[path.split("/").length-1];
    useEffect(() => {
       
      getPost();
   
    }, []);
  

    async function deletePost(){
      try{
        const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          router.replace("/");
         toast.success("Deleted");
        } else {
          toast.error(`An unknown error occurred.`);
        }
      } catch (error) {
       
        toast.error(`An error occurred while deleting post.`);
      }
    }

    async function getPost() {
        try {
            const response = await fetch(`/api/post/${id}`);
      
            if (response.status === 200) {
              const data = await response.json();
             
              setPost({...data.post})
            } else {
              toast.error(`An unknown error occurred.`);
            }
          } catch (error) {
           
            toast.error(`An error occurred while fetching post.`);
          }
        
    }
  
  return (
    <div className='w-3/4 mx-auto bg-white p-8 my-4'>

        <Image priority={true} className="w-3/4 mx-auto" src={post?.coverUrl == undefined || post.coverUrl =="/_next/static/media/placeholder.009bf1fe.jpg"  ?  placeholder : post.coverUrl} alt="Cover Image" />
        <h1 className='px-4 text-2xl font-semibold mt-4 text-center'>{post?.title}</h1>
        {
          post?.content &&
          (

            <p className='p-4' dangerouslySetInnerHTML={{__html: post.content}} ></p>
          )
        }
        {
          session.data?.user?.email == post?.author.email &&
          (

            <div className='flex gap-x-4'>
          <button onClick={deletePost} className='bg-red-400 p-3 text-sm shadow-lg'>Delete</button>
          {/* <Link href={`/posts/update/${id}`}> */}
          <button className='bg-green-400 p-3 text-sm shadow-lg'>Update</button>
          {/* </Link> */}
        </div>
          )
        }
    </div>
  )
}

export default page