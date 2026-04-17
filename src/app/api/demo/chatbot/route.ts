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

const DOMAIN_KEYWORDS = new Set([
  "admission",
  "admissions",
  "university",
  "universities",
  "program",
  "course",
  "degree",
  "scholarship",
  "visa",
  "ielts",
  "toefl",
  "gre",
  "gmat",
  "gpa",
  "sop",
  "statement",
  "purpose",
  "document",
  "application",
  "deadline",
  "recommendation",
  "profile",
  "study",
  "abroad",
  "intake",
  "tuition",
  "counselor",
  "dashboard",
]);

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
    return [] as Array<{ entry: KnowledgeEntry; score: number }>;
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
    .slice(0, maxResults);
}

function isDomainQuestion(message: string): boolean {
  const tokens = tokenize(message);
  return tokens.some((token) => DOMAIN_KEYWORDS.has(token));
}

function toTwoLineAnswer(text: string): string {
  const normalized = String(text || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (normalized.length >= 2) {
    return `${normalized[0]}\n${normalized[1]}`;
  }

  if (normalized.length === 1) {
    return `${normalized[0]}\nI can also help with admissions, SOP, documents, scholarships, and university recommendations.`;
  }

  return "Here is a quick general response for your question.\nI can also help with admissions, SOP, documents, scholarships, and university recommendations.";
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
    const rankedEntries = rankEntries(message, entries, 5);
    const matchedEntries = rankedEntries.map((item) => item.entry);
    const topScore = rankedEntries[0]?.score ?? 0;
    const hasStrongContext = matchedEntries.length > 0 && topScore >= 2;
    const domainQuestion = isDomainQuestion(message);
    const isIrrelevant = !domainQuestion && !hasStrongContext;

    const context = matchedEntries
      .map(
        (entry) =>
          `Title: ${entry.title}\nTags: ${entry.tags.join(", ")}\nContent: ${entry.content}`,
      )
      .join("\n\n---\n\n");

    const prompt = [
      "You are a student study-advisor assistant.",
      "Primary rule: use Context first when it is relevant.",
      "If Context is weak or missing, still answer using your general knowledge in a practical, student-friendly way.",
      "Never say you cannot answer unless the prompt is unsafe or empty.",
      isIrrelevant
        ? "This question seems outside study-advisor scope. Respond in exactly 2 short lines: line 1 gives a helpful direct answer, line 2 briefly redirects to study-advisor help."
        : "For in-scope questions, provide a concise helpful answer and include actionable next steps when useful.",
      "If you use assumptions, keep them minimal and explicit.",
      "",
      `Context strength: ${hasStrongContext ? "strong" : "weak"}`,
      `Context:\n${context || "(empty)"}`,
      "",
      `User question:\n${message}`,
    ].join("\n");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const rawAnswer = result.response.text().trim();

    const fallbackForEmpty = isIrrelevant
      ? "I can still help with a quick general response to that question.\nIf you want, ask me about admissions, SOP, documents, scholarships, or university recommendations."
      : "Based on general guidance, you can proceed step by step and verify details with official university pages. If you share your target country/program, I can give a more specific answer.";

    const finalAnswer = rawAnswer || fallbackForEmpty;

    return NextResponse.json({
      answer: isIrrelevant ? toTwoLineAnswer(finalAnswer) : finalAnswer,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
