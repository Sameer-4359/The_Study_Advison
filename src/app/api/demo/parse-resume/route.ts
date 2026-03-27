import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = (await req.json()) as { resumeText?: string };

    const text = String(resumeText ?? "");

    // BASIC extraction (temporary)
    const nameMatch = text.match(/Name:\s*(.*)/i);

    return NextResponse.json({
      name: nameMatch ? nameMatch[1] : "",
      achievements: text.slice(0, 500), // simple fallback
    });
  } catch {
    return NextResponse.json({ error: "Parsing failed" }, { status: 500 });
  }
}

