import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type Tone = "formal" | "passionate" | "academic";

const TONE_PROFILES: Record<Tone, string> = {
  formal:
    "Use polished professional language, concise sentences, and measured confidence. Avoid emotional overstatement.",
  passionate:
    "Use energetic but credible language, slightly warmer phrasing, and authentic enthusiasm without exaggeration.",
  academic:
    "Use analytical language, research-oriented framing, and evidence-driven claims with precise terminology.",
};

function sanitizeInput(value: unknown): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSystemPrompt(tone: Tone): string {
  return [
    "You are a senior graduate admissions writing consultant.",
    "Write one complete SOP/motivation letter that sounds human, specific, and realistic.",
    "Do not output markdown, headings, bullet points, JSON, analysis notes, or placeholders.",
    "Never mention AI, model, prompt, or that data is missing.",
    "Avoid fabricated concrete claims (exact grades, years, project names) unless provided.",
    "If some details are missing, use safe, plausible, generic phrasing that still sounds personal.",
    `Tone requirement: ${TONE_PROFILES[tone]}`,
  ].join(" ");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const tone = (sanitizeInput(body.tone).toLowerCase() ||
      "passionate") as Tone;
    const resolvedTone: Tone =
      tone === "formal" || tone === "academic" || tone === "passionate"
        ? tone
        : "passionate";

    const requiredFields = [
      "name",
      "country",
      "university",
      "program",
    ] as const;
    const missingRequired = requiredFields.filter(
      (field) => !sanitizeInput(body[field]),
    );

    if (missingRequired.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingRequired.join(", ")}`,
        },
        { status: 400 },
      );
    }

    const systemPrompt = buildSystemPrompt(resolvedTone);

    const userPrompt = `Please write a motivation letter for:

Student Name: ${sanitizeInput(body.name)}
Target Country: ${sanitizeInput(body.country)}
University: ${sanitizeInput(body.university)}
Program: ${sanitizeInput(body.program)}
Preferred Tone: ${resolvedTone}

Why This University:
${sanitizeInput(body.whyUniversity) || "Not specified"}

${sanitizeInput(body.courseDetails) ? `Courses:\n${sanitizeInput(body.courseDetails)}` : ""}

Achievements:
${sanitizeInput(body.achievements) || "Not specified"}

Future Goals:
${sanitizeInput(body.futureGoals) || "Not specified"}

${sanitizeInput(body.resumeText) ? `Resume:\n${sanitizeInput(body.resumeText).slice(0, 4000)}` : ""}
`;

    const requiredTemplate = `Use this exact output format and paragraph order:

To,
The Admission Committee, [University Name]
My name is [Your Name]. I am writing to apply for the Master’s program in [Program Name] at [University's Name]. This program focuses on [aspects of the intended program], which will help me [Desired Outcome]. I believe this program will provide me with skills in [Name 2-3 Skills], and that’s why I want to join this course.
I completed my [Your Degree] in [Your Major] at [Your University], where I studied courses like [List 3-4 Subjects related to intended program]. These courses gave me a strong understanding of [intended program Concepts and Skills]. During this degree, I worked on the [Name of Relevant Project] project. This project taught me [specific applications or skills]. This experience developed my interest in [Intended Field of Study] and now, I want to further advance in this field by pursuing a Master's program.
In addition to my studies, I have also gained practical experience through projects/internships/jobs. I interned/worked at [Company/Organization Name], where I was responsible for [Briefly Describe Internship Experience]. This internship/job taught me a lot and gave me practical skills in [Field or Subject related to the intended course]. These experiences helped me improve my [Name Technical Skills]. I also learned to work in a team and solve technical problems.
The reason I'm very interested in the [Program Name] at [University's Name] is because it offers [2 specific reasons/features of the program]. I am interested in its modules such as [Relevant Modules]. These modules will equip me with the necessary skills in [relevant skills]. Another reason I want to join this course is that [Second Reason/Interest] because [Specific explanation]. Now, I want to contribute to the ongoing work in this area. [Reason Justification]
My long-term career goal is to work in [Specific Career Goal or Field mentioned on the website]. I have always been interested in [ Area of Interest in this Field of Study] and [mention any educational project or professional experience]. I want to work in roles that allow me to [Specific Career Aspirations]. This master's program in [field of study] will help me to reach these goals.
I am very excited about joining the academic community at [University's Name]. My educational background, practical experience, and passion for [Field of Study] make me a strong candidate for the [Program Name]. Thank you for considering my application.
Yours sincerely,
[Your Name]

Rules:
- Replace bracket placeholders using the student data.
- If data is missing, infer a realistic, non-generic detail from available context.
- Keep tone aligned with Preferred Tone and remain internally consistent.
- Output only the final letter text in this format.`;

    // Prefer GEMINI_API_KEY, but also support LOVABLE_API_KEY since you stored the Gemini key there.
    const apiKey = process.env.GEMINI_API_KEY || process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY or LOVABLE_API_KEY" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${systemPrompt}\n\n${userPrompt}\n\n${requiredTemplate}`;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    if (!generatedText?.trim()) {
      return NextResponse.json(
        { error: "Model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ letter: generatedText });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
