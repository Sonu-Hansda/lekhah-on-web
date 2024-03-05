"use client"
// Import necessary modules
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import placeholder from "./placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
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

  return (
    <main>
      {posts.length > 0 ? (
        <div className="grid grid-cols-3 m-12">
          {posts.map((post, index) => (
            <div className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all ease-linear duration-300" key={index}>
              <Image priority={true} className="" src={post["coverImage"] == undefined  ?  placeholder : post["cover Image"]} alt="Cover Image" />
              <Link href={`/posts/${post["id"]}`}>
              <div className="p-4 hover:cursor-pointer">

              <h1 className="text-lg font-semibold p-2">
              {post["title"]}
              </h1>
              <p className="p-2">{post["content"]}</p>
              </div>
              </Link>
              </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </main>
  );
}
