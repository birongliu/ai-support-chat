"use client";
import React, { useState } from "react";
import { IResponse, MessageData } from "../util/types";

const defaultMessage: MessageData[] = [
  {
    role: "assistant",
    content:
      "Hi, I'm the Finance Support Agent, how can i assist you today?",
  },
];

export default function Chat() {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>(defaultMessage);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setShow(false);
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;
    while (true) {
      try {
        const { value, done } = await reader.read();
        const text = decoder.decode(value, { stream: true });

        setMessages((messages) => {
          let lastMessage = messages[messages.length -1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [...otherMessages, {
            ...lastMessage, 
            content: lastMessage.content + text
          }]
        })
        if(done) break;
      } catch (error) {}
    }
  }

  return (
    <main className="bg-gray-800 mx-5 rounded-xl h-screen my-10">
      <div
        className={`bg-gray-700 custom-scrollbar p-5 overflow-y-auto h-[85%] rounded-t-xl items-center gap-8 justify-center flex-col ${
          show ? "flex" : "block"
        }`}
      >
        <h1
          className={`text-2xl text-gray-400 font-bold ${
            show ? "block" : "hidden"
          }`}
        >
          Type a prompt to get start
        </h1>
        <ul
          className={`${
            messages.length > 2 ? "mt-10" : ""
          } rounded-xl mx-12 sm:mx-20 flex flex-col gap-5`}
        >
          {messages.map((data, i) => (
            <li
              key={i}
              className={` ${
                data.content === "" ? "hidden" : "block"
              } border bg-gray-900 border-gray-700 rounded p-2`}
            >
              {data.content}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center p-2 text-neutral-400 sm:font-normal text-sm">warning: consult a financial advisor for better understanding of your own finace</div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 rounded-b-xl w-full h-20 text-black flex items-center gap-4"
      >
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Search for topic related to pets"
          className="w-full h-full px-5 bg-gray-600 rounded-b-lg outline-none border border-gray-400"
        ></input>
      </form>
    </main>
  );
}
