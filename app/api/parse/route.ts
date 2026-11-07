import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are BlinkGuard's natural-language Web3 parser. Analyze this user instruction: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, enum: ["swap", "transfer", "drainer_test", "unknown"] },
            inputToken: { type: Type.STRING, description: "e.g., SOL, USDC" },
            outputToken: { type: Type.STRING, description: "e.g., USDC, SOL" },
            amount: { type: Type.NUMBER, description: "Numeric amount to swap" },
            slippagePercent: { type: Type.NUMBER, description: "Slippage tolerance, default 0.5" },
            isMalicious: { type: Type.BOOLEAN, description: "True if phishing, drainer, free mint claim, or suspicious" },
            threatReason: { type: Type.STRING, description: "Detailed threat explanation if malicious" }
          },
          required: ["action", "isMalicious"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("AI Parse Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}