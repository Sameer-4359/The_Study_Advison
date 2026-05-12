import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getGeminiApiKey } from "@/lib/serverConfig";
import {
  buildSopReferenceContext,
  inferSopField,
} from "@/lib/sopReferenceSamples";

function sanitizeInput(value: unknown): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const systemPrompt =
      "You are an expert admissions consultant. First read the provided SOP reference samples, then write a natural, human-sounding motivation letter aligned to the student's field. Follow the required structure exactly. Do not add markdown, bullets, headings, links, notes, or promotional lines. Do not mention AI. Keep language realistic and specific. Never copy sample lines verbatim.";

    const inferredField = inferSopField({
      program: sanitizeInput(body.program),
      courseDetails: sanitizeInput(body.courseDetails),
      achievements: sanitizeInput(body.achievements),
      futureGoals: sanitizeInput(body.futureGoals),
    });
    const referenceContext = buildSopReferenceContext(inferredField);

    let userPrompt = `Please write a motivation letter for:

Student Name: ${sanitizeInput(body.name)}
Target Country: ${sanitizeInput(body.country)}
University: ${sanitizeInput(body.university)}
Program: ${sanitizeInput(body.program)}
Preferred Tone: ${sanitizeInput(body.tone)}

Why This University:
${sanitizeInput(body.whyUniversity) || "Not specified"}

${sanitizeInput(body.courseDetails) ? `Courses:\n${sanitizeInput(body.courseDetails)}` : ""}

Achievements:
${sanitizeInput(body.achievements)}

Future Goals:
${sanitizeInput(body.futureGoals)}

${sanitizeInput(body.resumeText) ? `Resume:\n${sanitizeInput(body.resumeText).substring(0, 4000)}` : ""}
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
- Keep tone aligned with Preferred Tone.
- Output only the final letter text in this format.`;

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${systemPrompt}\n\nInferred student field: ${inferredField}\n\n${referenceContext}\n\n${userPrompt}\n\n${requiredTemplate}`;
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    return NextResponse.json({ letter: generatedText });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

