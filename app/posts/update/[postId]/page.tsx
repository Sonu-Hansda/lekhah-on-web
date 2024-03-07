"use client"

import { 
    BtnBold, 
    BtnItalic, 
    BtnUnderline,
    BtnBulletList,
    Editor, 
    EditorProvider, 
    Toolbar
  } from 'react-simple-wysiwyg';

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import placeholder from "../placeholder.jpg";
import Image, { StaticImageData } from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCurrentUser } from '@/lib/user';
import { usePathname } from 'next/navigation';

interface postData{
    title: string,
    description: string,
    coverImage:string|StaticImageData |undefined,
    email:string|null|undefined,
}

export  default async function update(){
    const path = usePathname();
    const router = useRouter();
    const curUser = await getCurrentUser();
    const id = path.split("/")[path.split("/").length-1];

    
    const [post,setPost] = useState<postData>({
        coverImage:undefined,
        description:"",
        title:"",
        email:curUser?.email,
    });

        useEffect(() => {
       
            getPost();
         
          }, []);
        
      
        function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
            const { name, value } = event.target;
            setPost(prevState => ({
              ...prevState,
              [name]: value
            }));
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
      
          
     async function handlesubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        const {title,description,coverImage,email} = post;
        if (!title || title.trim.length !>0) {
            return toast.warning("Title should not be empty !");
        }else if (!description || description.trim.length !> 0 ){
            return toast.warning("Description should not be empty");
        }else {
            
          console.log({...post});
          
    // const response = await fetch('/api/post',{
    //     method:'POST',
    //     headers:{'Content-Type':'application/json'},
    //     body:JSON.stringify({
    //         title:post.title,
    //         description:post.description,
    //         coverImage:post.coverImage ?? undefined,
    //         email: session.data?.user?.email
    //     })
    //   });
      
    //   if (response.status == 201 ){
    //     router.push("/");
    //     return toast.success(`Post created successfully!`);
        
    //   }
    //   else{
    //     return toast.error(`An unknown error occurred.`);
    //   }
  
        }
        
    }
    return(
        <section className="w-3/4 md:w-1/2 mx-auto my-8">
            <h1 className="text-3xl font-extrabold text-slate-600 text-center mb-2">Create Post</h1>
        <form onSubmit={handlesubmit}>

    <div className="bg-white p-12 mb-4">

           <Image src={post.coverImage!} width={200} height={200} alt="Placeholder image" className="mx-auto hover:cursor-pointer" />
    </div>
           <div className="w-full mb-4">
            <input className="w-full text-xl font-semibold p-4 outline-none border-2 focus:border-slate-600 " onChange={handleInputChange} placeholder="Post title" type="text" name="title" id="title" />
           </div>
           <div className="w-full mb-4">
           
            <EditorProvider>
                <Editor  style={{"backgroundColor":"white","minHeight":"14rem","padding":"1.2rem"}} value={post.description} onChange={(e)=>{setPost({...post,description:e.target.value})}} >
                    <Toolbar>
                        <BtnBold/>
                        <BtnUnderline/>
                        <BtnItalic/>
                        <BtnBulletList/>
                    </Toolbar>
                </Editor>
            </EditorProvider>
          
            </div>
           <div className="w-full">
            <button type="submit" className="w-full p-2 bg-blue-400 hover:bg-blue-600 font-semibold">Submit</button>
           </div>
        </form>
        </section>
    );
}