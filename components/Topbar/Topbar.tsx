"use client"

import React from "react";
import logo from "@/public/logo_horizontal.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Topbar() {

  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    router.push('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth", block: "center"});
    }, 200); 
  }


  return (
    <motion.div
    
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}

    className="flex p-10 justify-between text-xl max-w-screen-xl mx-auto">
      <Link href="/">
        <Image src={logo} alt="logo" height={50} />
      </Link>
      <div className="gap-5 hidden md:flex font-medium m-auto">
        <Link href="/" className={`transition hover:text-white hover:cursor-pointer ${pathname == '/' ? 'text-white' : 'text-zinc-600'}`}>
          Home
        </Link>
        <Link href="/about" className={`transition hover:text-white hover:cursor-pointer ${pathname == '/about' ? 'text-white' : 'text-zinc-600'}`}>
          About
        </Link>
        <Link href="/" onClick={() => scrollToSection("support")} className={`transition hover:text-white hover:cursor-pointer text-zinc-600`}>
          Contact
        </Link>
      </div>
      <div className="my-auto">
      <Button className="hover:scale-105 transition" onClick={() => router.push("https://simulation.devolt.xyz/")}>
        Get started
      </Button>
      </div>
    </motion.div>
  );
}
