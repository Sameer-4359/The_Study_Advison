import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import knowledge from "@/data/chatbot-knowledge.json";

export const runtime = "nodejs";

type KnowledgeEntry = {
  id: string;
  title: string;
  tags: string[];
  content: string;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function rankEntries(query: string, entries: KnowledgeEntry[], maxResults = 5) {
  const queryTokens = tokenize(query);
  const queryTokenSet = new Set(queryTokens);

  if (queryTokenSet.size === 0) {
    return [];
  }

  return entries
    .map((entry) => {
      const contentTokens = tokenize(`${entry.title} ${entry.content}`);
      const contentTokenSet = new Set(contentTokens);
      let score = 0;

      for (const token of queryTokenSet) {
        if (contentTokenSet.has(token)) {
          score += 1;
        }
      }

      for (const tag of entry.tags.map((tag) => tag.toLowerCase())) {
        if (queryTokenSet.has(tag)) {
          score += 2;
        }
      }

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.entry);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? body?.query ?? "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY or LOVABLE_API_KEY" },
        { status: 500 },
      );
    }

    const entries = Array.isArray(knowledge.entries)
      ? (knowledge.entries as KnowledgeEntry[])
      : [];
    const matchedEntries = rankEntries(message, entries, 5);

    const context = matchedEntries
      .map(
        (entry) =>
          `Title: ${entry.title}\nTags: ${entry.tags.join(", ")}\nContent: ${entry.content}`,
      )
      .join("\n\n---\n\n");

    const prompt = [
      "Answer ONLY from the context below.",
      "If context is insufficient, reply exactly: Mujhe iska jawab nahi pata.",
      "Do not guess and do not use external knowledge.",
      "Keep the answer concise and student-friendly.",
      "",
      `Context:\n${context || "(empty)"}`,
      "",
      `User question:\n${message}`,
    ].join("\n");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text().trim();

    return NextResponse.json({
      answer: answer || "Mujhe iska jawab nahi pata.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
