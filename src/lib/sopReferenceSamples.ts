export type SopField =
  | "computer_science"
  | "engineering"
  | "medical"
  | "law"
  | "business";

type SopSample = {
  field: SopField;
  title: string;
  content: string;
};

const SOP_SAMPLES: SopSample[] = [
  {
    field: "computer_science",
    title: "Computer Science Sample",
    content: `I spent the better part of my second year at university convinced I had chosen the wrong field. My grades were unremarkable, I found most of my coursework abstract in a way that felt pointless, and I seriously considered switching to economics. What changed was a hackathon where my team built a prototype app using computer vision to help visually impaired users navigate grocery stores. We did not win and the app barely worked, but building something with clear human purpose reoriented my relationship to the subject.
I completed my BTech in Computer Science and Engineering from SRM Institute of Science and Technology, Chennai, graduating in 2023. After a slow start, my final two years were academically strong and I finished with a CGPA of 9.1. I also led our university's Computing for Social Good club.
My most substantive project experience came from a six-month internship at Zoho Corporation's AI Research Team, where I worked on a document understanding pipeline for their CRM platform. My contribution was developing a multi-task learning model that extracted named entities and classified document intent.
I am drawn to the MScAC at the University of Toronto for reasons that go beyond ranking. The co-op structure and the Vector Institute affiliation are central to my interest.
My short-term goal is a role in machine learning engineering on socially meaningful problems like healthcare, education, or accessibility. My long-term goal is to build AI tools that are accessible to non-technical communities in India and Southeast Asia.`,
  },
  {
    field: "engineering",
    title: "Engineering Sample",
    content: `The Senegal River flooded three times during my childhood. I grew up with a practical understanding of water as both a resource and a risk long before I understood it as an engineering problem.
I completed my Licence in Civil Engineering and then an Engineering degree from Ecole Polytechnique de Thies in Senegal, graduating with distinction. My final thesis analyzed drainage capacity in a periurban district in Dakar under climate-intensified rainfall assumptions.
I then worked as a junior engineer at the Societe Nationale des Eaux du Senegal on rural water supply projects. I learned to design for contexts with limited maintenance capacity and irregular power supply.
I am applying to Delft's MSc in Civil Engineering, Water Management track, because of its depth in integrated water systems, climate adaptation planning, and hydraulic modeling.
My career goal is to return to Senegal and contribute to resilient, climate-adapted water systems across West Africa.`,
  },
  {
    field: "medical",
    title: "Medical/Public Health Sample",
    content: `Karachi taught me that public health is mostly about structure. I qualified as a physician from Dow University of Health Sciences in 2019 and spent the following years in clinical medicine. I repeatedly saw that severe patient outcomes were often driven by poverty, sanitation, and care access failures rather than biology alone.
I completed MBBS at Dow with a distinction average and developed interests in infectious disease epidemiology and maternal health.
After my house officer year, I joined Aga Khan University Hospital's Department of Community Health Sciences as a research associate on a multi-site study of postnatal care practices and neonatal mortality in Sindh.
I am applying to the University of Melbourne MPH because of its strengths in health systems, infectious disease control, and quantitative training in epidemiology and biostatistics.
My goal is to return to Pakistan and contribute to public health research and program design in infectious disease and maternal health.`,
  },
  {
    field: "law",
    title: "Law Sample",
    content: `Pakistan's energy crisis is an everyday legal and economic reality. I studied law because I believed legal frameworks could be part of the solution, and I now believe they are central to it.
I completed my LLB (Honours) from the University of the Punjab, Lahore, in 2019, graduating in the top 10% of my cohort. My dissertation examined the regulatory framework for independent power producers in Pakistan, with comparative analysis of India and Bangladesh.
After qualification, I joined a commercial law firm in Lahore with an energy law practice. I worked on contract negotiations for power projects, regulatory filings with NEPRA, and disputes related to power purchase agreements.
I am applying to Queen Mary's LLM in Energy and Natural Resources Law for its focused training in comparative energy regulation and investment law.
My career goal is to become an energy law specialist in Pakistan and support a regulatory environment that can attract renewable energy investment.`,
  },
  {
    field: "business",
    title: "Business/Fintech Sample",
    content: `India's MSME credit gap remains one of the biggest constraints on inclusive growth. I have spent years working at the intersection of technology, finance, and regulation to help address it.
I completed my BTech in Computer Science from IIT Delhi in 2017 with a CGPA of 8.9. I later worked in the RBI fintech regulatory sandbox as a technical analyst, then moved to a Bengaluru lending startup as Head of Data Science.
At KreditSaathi, I built credit scoring models for MSME lending using non-traditional signals such as GST and utility data. The portfolio scaled significantly while maintaining strong risk performance.
I am applying to MIT Sloan because of its analytical rigor, fintech ecosystem, and action-learning model.
My post-MBA goal is to build MSME credit infrastructure for India at scale, enabling better credit access through stronger underwriting and decision systems.`,
  },
];

export function inferSopField(input: {
  program?: string;
  courseDetails?: string;
  achievements?: string;
  futureGoals?: string;
}): SopField {
  const corpus = [
    input.program || "",
    input.courseDetails || "",
    input.achievements || "",
    input.futureGoals || "",
  ]
    .join(" ")
    .toLowerCase();

  if (/(computer|software|data|ai|machine learning|cyber|informatics|cs)/.test(corpus)) {
    return "computer_science";
  }
  if (/(civil|mechanical|electrical|structural|water|hydraulic|engineering)/.test(corpus)) {
    return "engineering";
  }
  if (/(mbbs|medicine|medical|public health|epidemiology|clinical|hospital)/.test(corpus)) {
    return "medical";
  }
  if (/(llb|law|legal|regulation|compliance|litigation|contract)/.test(corpus)) {
    return "law";
  }
  return "business";
}

export function buildSopReferenceContext(field: SopField): string {
  const primary = SOP_SAMPLES.find((sample) => sample.field === field);
  const secondary = SOP_SAMPLES.filter((sample) => sample.field !== field)
    .map((sample) => `${sample.title}: ${sample.content}`)
    .join("\n\n");

  return [
    "Reference SOP examples (read before writing):",
    `Primary field example (${field}):`,
    primary ? primary.content : "",
    "",
    "Other examples for style calibration:",
    secondary,
    "",
    "How to use references:",
    "- Mirror structure quality, specificity, and narrative flow.",
    "- Adapt content strictly to the student's real profile and target program.",
    "- Never copy sentences verbatim from reference samples.",
  ].join("\n");
}

