import {
  aboutParagraphs,
  certifications,
  education,
  journey,
  linkedInProfileSnapshot,
  site,
  skillGroups,
} from "@/lib/content";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const CAREER_CONTEXT = `
Name: ${site.name}
Role: ${site.role}
Location: ${site.location}
Email: ${site.email}
LinkedIn: ${site.linkedin}
GitHub: ${site.github}
Tagline: ${site.tagline}

About:
${aboutParagraphs.map((p) => `- ${p}`).join("\n")}

Core skills:
${skillGroups.core.map((s) => `- ${s}`).join("\n")}

Currently deepening:
${skillGroups.deepening.map((s) => `- ${s}`).join("\n")}

Career journey:
${journey
  .map(
    (item) =>
      `- ${item.period}: ${item.title} at ${item.org} (${item.location})` +
      (item.description?.length ? ` | ${item.description.join(" ")}` : "")
  )
  .join("\n")}

Education:
${education
  .map((e) => `- ${e.degree} at ${e.school} (${e.period})`)
  .join("\n")}

Certifications:
${certifications.map((c) => `- ${c}`).join("\n")}

LinkedIn profile snapshot:
- Headline: ${linkedInProfileSnapshot.headline}
- About: ${linkedInProfileSnapshot.about}
- Interests: ${linkedInProfileSnapshot.interests.join(", ")}
- Currently learning: ${linkedInProfileSnapshot.currentlyLearning.join(", ")}
- Achievements: ${linkedInProfileSnapshot.achievements.join(", ")}
`.trim();

const SYSTEM_PROMPT = `
You are Yatharth Sharma's "Digital Twin" for a portfolio website chat.
Answer questions about his career, skills, projects, learning journey, and background.
Rules:
- Be accurate and grounded in the provided context.
- If information is not available, clearly say that and suggest asking Yatharth directly.
- Do not invent companies, achievements, or timelines.
- If an item is only a title (for example LinkedIn achievement names), do not expand it with guessed descriptions.
- Keep responses concise, helpful, and professional.
- Use first person ("I") because this is a digital twin persona.
`.trim();

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OpenRouter_API_KEY ?? process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "OpenRouter API key is missing in environment." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const linkedInFullText = process.env.LINKEDIN_PROFILE_FULL_TEXT?.trim();

    const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
    const safeMessages = incomingMessages
      .filter(
        (m): m is ChatMessage =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-12);

    if (safeMessages.length === 0) {
      return Response.json({ error: "At least one message is required." }, { status: 400 });
    }

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": `${site.name} Portfolio Digital Twin`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        temperature: 0.5,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `Career context:\n${CAREER_CONTEXT}` },
          ...(linkedInFullText
            ? [
                {
                  role: "system" as const,
                  content: `Additional LinkedIn profile details:\n${linkedInFullText}`,
                },
              ]
            : []),
          ...safeMessages,
        ],
      }),
    });

    const data = await openRouterResponse.json();
    if (!openRouterResponse.ok) {
      const message =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "OpenRouter request failed.";
      return Response.json({ error: message }, { status: openRouterResponse.status });
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      return Response.json({ error: "Model returned an empty response." }, { status: 502 });
    }

    return Response.json({ reply });
  } catch {
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
