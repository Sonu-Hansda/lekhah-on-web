"use client"
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-200"}>
        <SessionProvider>
        <Toaster position="top-center" richColors />
        <Navbar/>
        <main className="min-h-screen">
        {children}
        </main>
       <Footer/> 
        </SessionProvider>
        </body>
    </html>
  );
}
