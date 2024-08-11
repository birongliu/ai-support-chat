"use client"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Head() {
  const path = usePathname()
  console.log(path)
  return (
    <header className="my-10 flex items-center justify-between md:mx-24 mx-16">
      <h1 className="text-white font-bold text-2xl">AI Support</h1>
      <div className={`border py-1 px-2 rounded-xl hover:bg-slate-800`}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        {path === "/chat" ? <SignOutButton /> : <Link href={"/chat"}>Chat</Link>}
      </SignedIn>
      
      </div>
    </header>
  );
}
