"use client"

import Image from "next/image";
import logo from "@/app/logo.png";
import Link from "next/link";
import {FiMenu} from "react-icons/fi";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaXmark } from "react-icons/fa6";

export default function Navbar(){
  const session = useSession();
  const [showMenu,setShowMenu] = useState(false);
      
      useEffect(() => {
       
        window.addEventListener('resize', ()=>setShowMenu(false));
        
        return () => window.removeEventListener('resize', ()=>setShowMenu(false));
      }, []);
    return (
        <nav className="flex bg-white justify-center md:justify-between px-36 py-5 ">
            <FiMenu className="block md:hidden text-2xl absolute left-4 top-6 cursor-pointer" onClick={()=>setShowMenu((prev)=>!prev)} />
          <div className="flex space-x-1 items-center align-middle">
          <Image src={logo} alt="Site logo" height={32} width={32} />
          <Link href={"/"}>
          <h1 className="text-2xl font-bold">लेखक<span className="text-blue-500">on</span>web</h1>
          </Link>
          </div>
          <ul className={`fixed md:hidden ${showMenu? "left-0" : "-left-full"} top-0 bg-blue-500 w-full h-screen p-12 transition-all ease-linear duration-300`}>
            <FaXmark className="absolute right-6 text-3xl hover:cursor-pointer" onClick={()=>setShowMenu(prev=>!prev)}/>
            <h1 className="text-5xl font-medium mb-2">Menu</h1>
            <Link href={"/"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Home</Link>
            <Link href={"/write"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Write</Link>
            <Link href={"/posts"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Posts</Link>
            {
              session.data?
              (
                <Link href={"/logout"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Logout</Link>
               

              ):(<>
                <Link href={"/login"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Sign In</Link>
                <Link href={"/register"} onClick={()=>setShowMenu(false)} className="block text-xl hover:underline underline-offset-2 hover:cursor-pointer hover:text-white transition-all duration-300 ease-linear" >Create Account</Link>
               
              </>
              )
            }
          </ul>
          <ul className="hidden md:flex space-x-4 text-sm items-baseline ">
            <Link href={"/"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Home</li>
            </Link>

            <Link href={"/write"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Write</li>
            </Link>

            <Link href={"/posts"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Posts</li>
            </Link>
            {
               session.data?
              (
                <Link href={"/api/auth/signout"}>
                  <li>logout</li>
                </Link>
              ):(
                <>

                <Link href={"/login"}>
                <li className="hover:underline underline-offset-4 cursor-pointer">Sign In</li>
                </Link>
                <Link href={"/register"}>
                <li className="hover:bg-blue-800 cursor-pointer bg-blue-500 p-2 text-white  transition-all duration-300">Create Account</li>
                </Link>
                </>)
                }
          </ul>
        </nav>
    );
}