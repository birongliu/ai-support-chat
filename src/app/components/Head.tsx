import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import React from "react";

export default function Head() {
  return (
    <header className="my-10 flex items-center justify-between md:mx-24 mx-16">
      <h1 className="text-white font-bold text-2xl">AI Support</h1>
      <div className="border py-1 px-2 rounded-xl hover:bg-slate-800">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      
      </div>
    </header>
  );
}
