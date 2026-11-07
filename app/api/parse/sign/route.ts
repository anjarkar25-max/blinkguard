import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "YOUR_ACTUAL_GEMINI_KEY") {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing or invalid in .env.local" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are BlinkGuard's natural-language Web3 parser.
Analyze this user command: "${prompt}".
Respond strictly with valid JSON only (no markdown, no backticks).
JSON schema:
{
  "action": "swap" | "transfer" | "drainer_test" | "unknown",
  "inputToken": string,
  "outputToken": string,
  "amount": number,
  "slippagePercent": number,
  "isMalicious": boolean,
  "threatReason": string
}`,
    });

    const rawText = response.text || "{}";
    const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(cleaned);

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("AI Parse Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}