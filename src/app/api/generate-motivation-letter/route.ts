import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const systemPrompt = `You are an expert admissions consultant... (SAME AS YOUR LOVABLE CODE)`;

    let userPrompt = `Please write a motivation letter for:

Student Name: ${body.name}
Target Country: ${body.country}
University: ${body.university}
Program: ${body.program}
Preferred Tone: ${body.tone}

Why This University:
${body.whyUniversity || "Not specified"}

${body.courseDetails ? `Courses:\n${body.courseDetails}` : ""}

Achievements:
${body.achievements}

Future Goals:
${body.futureGoals}

${body.resumeText ? `Resume:\n${body.resumeText.substring(0, 2000)}` : ""}
`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${systemPrompt}\n\n${userPrompt}`;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    return NextResponse.json({ letter: generatedText });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

