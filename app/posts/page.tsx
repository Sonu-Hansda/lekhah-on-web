"use client"

import {  useEffect, useState } from "react";
import placeholder from "../placeholder.jpg";
import Image, { StaticImageData } from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
// interface postData{
//     title: string,
//     description: string,
//     coverImage:string|StaticImageData |undefined,
//     email:string|null|undefined,
// }

export default function AllPosts(){
    const [posts, setPosts] = useState([]);
  const session = useSession();

  useEffect(() => {
    getAllPosts();
  }, []);

  async function getAllPosts() {
    try {
      const response = await fetch('/api/post', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        const data = await response.json();
        setPosts(data.posts); 
      } else {
        toast.error(`An unknown error occurred.`);
      }
    } catch (error) {
     
      toast.error(`An error occurred while fetching posts.`);
    }
  }

    return(
        <section className="w-3/4 mx-auto my-8">
            {posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 m-12">
          {posts.map((post, index) => (
            <div className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all ease-linear duration-300" key={index}>
              <Image priority={true} className="" src={post["coverImage"] == undefined  ?  placeholder : post["cover Image"]} alt="Cover Image" />
              <Link href={`/posts/${post["id"]}`}>
              <div className="p-4 hover:cursor-pointer">

              <h1 className="text-lg font-semibold p-2">
              {post["title"]}
              </h1>
              <p className="p-2 text-ellipsis overflow-hidden h-24" dangerouslySetInnerHTML={{__html:post["content"]}}></p>
              </div>
          </Link>
              </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
        </section>
    );
}