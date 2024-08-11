import { IResponse } from "@/app/util/types";
import { NextRequest, NextResponse } from "next/server";

const systemPrompt =
  "You are a financial advisor bot, Your role is to assist users by providing clear, concise, and helpful information.";
export async function POST(request: NextRequest) {
  const data = await request.json();
  const completions = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [...data, { role: "system", content: systemPrompt }],
        stream: true,
      }),
    }
  );
  const stream = new ReadableStream({
    async start(controller) {
      const reader = completions.body?.getReader();
      if (!reader)
        return NextResponse.json({ data: "Internal Error", status: 500 });
      
      while (true) {
        try {
          const { value, done } = await reader.read();
          const chunks: IResponse[] = new TextDecoder()
            .decode(value)
            .split("\n")
            .map((line) => line.replace("data: ", ""))
            .filter((line) => line.length > 0)
            .filter((line) => line !== ": OPENROUTER PROCESSING")
            .filter((line) => line !== "[DONE]")
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch (error) {
                
              }
            });
          const encoder = new TextEncoder();
          if (chunks.length) {
            for (let chunk of chunks) {
              if(!chunk) continue;
              const content = chunk.choices[0].delta.content;
              if (content) {
                const text = encoder.encode(content);
                
                controller.enqueue(text);
              }
            }
          }
          if (done) {
            controller.close();
            break;
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  return new NextResponse(stream);
}
