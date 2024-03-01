"use client"

import Image from "next/image";
import logo from "@/app/logo.png";
import Link from "next/link";
import {FiMenu} from "react-icons/fi";
import { useState,useEffect } from "react";

export default function Navbar(){
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
          <h1 className="text-2xl font-bold">लेखक<span className={`${showMenu? `text-blue-500` : `text-red-500`}`}>on</span>web</h1>
          </Link>
          </div>
          <ul className="hidden md:flex space-x-4 text-sm items-baseline ">
            <Link href={"/"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Home</li>
            </Link>
            <Link href={"/create"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Write</li>
            </Link>
            <Link href={"/login"}>
            <li className="hover:underline underline-offset-4 cursor-pointer">Sign In</li>
            </Link>
            <Link href={"/register"}>
            <li className="hover:bg-blue-800 cursor-pointer bg-blue-500 p-2 text-white  transition-all duration-300">Create Account</li>
            </Link>
          </ul>
        </nav>
    );
}