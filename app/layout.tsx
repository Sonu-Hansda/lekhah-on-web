import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "लेखक-on-web",
  description: "This website deals with the content writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-200"}>
        <Navbar/>
        <main className="min-h-screen">
        {children}
        </main>
       <Footer/> 
        </body>
    </html>
  );
}
