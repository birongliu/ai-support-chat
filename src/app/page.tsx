"use client";
import { useState } from "react";
import Form from "./components/Form";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((prev) => !prev);

  return (
    <main className="h-full md:mx-24 mx-12 mt-52 mb-48">
      <section className="flex items-center font-extrabold justify-center mt-48 flex-col">
        <Form open={open} handleOpen={handleOpen} />
        <h1 className="text-xl font-extrabold mb-5">
          AI Support Chat for Financial Queries
        </h1>
        <p className="text-base font-medium lg:mx-[18%] flex justify-center items-center">
          An AI assistant helps with financial queries, from budgeting advice to
          scholarship tips. Whether you&apos;re new or experienced, get
          personalized support to ensure you make informed financial decisions.
        </p>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="border py-1 px-2 rounded-xl mt-4 hover:bg-slate-800"
        >
          WaitList
        </button>
      </section>
    </main>
  );
}
