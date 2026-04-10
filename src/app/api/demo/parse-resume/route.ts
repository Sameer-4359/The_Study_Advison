import { NextRequest, NextResponse } from "next/server";

import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function cleanText(input: string): string {
  return input
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function normalizeForSearch(input: string): string {
  return input
    .replace(/\u0000/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSection(text: string, headings: string[]): string {
  const lines = text.split(/\n/);
  const normalizedHeadings = headings.map((h) => h.toLowerCase());
  let start = -1;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim().toLowerCase();
    if (
      normalizedHeadings.some((h) => line === h || line.startsWith(`${h}:`))
    ) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) {
    return "";
  }

  const collected: string[] = [];
  for (let i = start; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const lower = line.toLowerCase();
    const looksLikeNextHeading =
      /^[a-z][a-z\s/&-]{2,30}:?$/.test(lower) &&
      [
        "education",
        "experience",
        "projects",
        "skills",
        "certifications",
        "summary",
        "objective",
        "achievements",
        "awards",
        "interests",
      ].includes(lower.replace(/:$/, ""));

    if (looksLikeNextHeading && collected.length > 0) {
      break;
    }

    if (line) {
      collected.push(line);
    }

    if (collected.join(" ").length > 900) {
      break;
    }
  }

  return cleanText(collected.join("\n"));
}

function extractName(text: string): string {
  const normalized = normalizeForSearch(text);

  const explicitName = normalized.match(
    /(?:^|\b)(?:name|full\s*name)\s*[:\-]\s*([a-z][a-z\s'.-]{2,60})/i,
  );
  if (explicitName?.[1]) {
    return explicitName[1].trim();
  }

  const firstLines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 8);

  for (const line of firstLines) {
    if (/[@\d]/.test(line)) continue;
    if (line.length < 3 || line.length > 50) continue;
    if (/\b(resume|curriculum vitae|cv|profile)\b/i.test(line)) continue;
    if (/^[a-z]+(?:\s+[a-z]+){1,3}$/i.test(line)) {
      return line;
    }
  }

  return "";
}

function extractAchievements(text: string): string {
  const fromSection = extractSection(text, [
    "achievements",
    "projects",
    "experience",
    "summary",
  ]);
  if (fromSection) {
    return fromSection.slice(0, 1200);
  }

  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 50);

  return cleanText(lines.join("\n")).slice(0, 1200);
}

async function readFileText(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const fileName = (file.name || "").toLowerCase();
  const type = (file.type || "").toLowerCase();

  if (type.includes("pdf") || fileName.endsWith(".pdf")) {
    const parsed = await pdfParse(bytes);
    return cleanText(parsed.text || "");
  }

  if (type.includes("wordprocessingml") || fileName.endsWith(".docx")) {
    const parsed = await mammoth.extractRawText({ buffer: bytes });
    return cleanText(parsed.value || "");
  }

  return cleanText(bytes.toString("utf8"));
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No resume file received." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Please upload a file smaller than 5MB." },
        { status: 400 },
      );
    }

    const text = await readFileText(file);
    if (!text || text.length < 20) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text from the resume. Try a text-based PDF or DOCX.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      name: extractName(text),
      achievements: extractAchievements(text),
      extractedText: text.slice(0, 8000),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Resume parsing failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
