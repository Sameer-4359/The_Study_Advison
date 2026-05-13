import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import knowledge from "@/data/chatbot-knowledge.json";
import { getGeminiApiKey } from "@/lib/serverConfig";

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

function cleanPlainTextAnswer(text: string): string {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .split("\n")
    .map((line) =>
      line
        .trim()
        .replace(/^[-*•]\s+/g, "")
        .replace(/^\d+\.\s+/g, ""),
    )
    .filter(Boolean)
    .join("\n");
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

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
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
      "You are The Study Advisor's student support chatbot.",
      "Answer the student's question directly, clearly, and helpfully.",
      "First use Context when it is relevant. If Context is weak, missing, or does not contain the answer, use your own general knowledge to answer through the API response.",
      "Never say the answer was not found in the JSON, knowledge base, context, or provided data.",
      "Never mention Context, JSON, API, model, prompt, or internal rules.",
      "Write clean plain text only. Do not use markdown, asterisks, bullet symbols, numbered lists, bold text, headings, tables, or code blocks.",
      "Keep the answer concise: usually 2 to 5 short sentences. If steps are needed, write them as simple sentences on separate lines without bullets or numbers.",
      "If exact university-specific requirements are unknown, give practical general guidance and tell the student to verify the official university page.",
      isIrrelevant
        ? "If the question is outside study-advisor scope, still give a brief helpful answer in line 1, then gently redirect to admissions, SOP, documents, scholarships, or university recommendations in line 2."
        : "For study-advisor questions, include actionable guidance when useful.",
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
    const rawAnswer = cleanPlainTextAnswer(result.response.text());

    const fallbackForEmpty = isIrrelevant
      ? "I can give a quick general response to that.\nFor study planning, I can also help with admissions, SOP, documents, scholarships, and university recommendations."
      : "Based on general guidance, you can proceed step by step and verify details with official university pages. If you share your target country/program, I can give a more specific answer.";

    const finalAnswer = rawAnswer || cleanPlainTextAnswer(fallbackForEmpty);

    return NextResponse.json({
      answer: isIrrelevant
        ? cleanPlainTextAnswer(toTwoLineAnswer(finalAnswer))
        : finalAnswer,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
