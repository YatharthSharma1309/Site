"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionIntro } from "@/components/SectionIntro";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_QUESTIONS = [
  "What is your current role and focus?",
  "How has your journey evolved from analytics to engineering?",
  "Which backend skills are you currently learning?",
];

export function DigitalTwinSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi, I am Yatharth's Digital Twin. Ask me about his career journey, skills, current role, or what he is learning next.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  useEffect(() => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    const userText = text.trim();
    if (!userText || isLoading) return;

    setIsLoading(true);
    setError(null);

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: userText },
    ];
    setMessages(nextMessages);
    setInput("");

    try {
      const response = await fetch("/api/digital-twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Could not get a response right now.");
      }

      if (!data.reply) {
        throw new Error("Empty response received from the model.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please retry.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section
      id="digital-twin"
      className="border-border-subtle border-t py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionIntro
          eyebrow="AI Digital Twin"
          title="Chat with my career twin"
          description="Ask direct questions about my role, experience, skills, and growth trajectory. Responses are grounded in this portfolio's career data."
        />

        <Reveal delay={0.08}>
          <div className="surface-card border-border-subtle mt-12 rounded-2xl border p-4 shadow-[0_24px_46px_-28px_rgba(0,0,0,0.65)] sm:p-6">
            <div className="border-border-subtle mb-4 flex items-center justify-between border-b px-2 pb-4 sm:px-1">
              <div>
                <p className="text-text-primary text-sm font-semibold">
                  Career Twin Assistant
                </p>
                <p className="text-text-muted text-xs">
                  Powered by OpenRouter · Context-aware of your profile
                </p>
              </div>
              <span className="text-accent inline-flex items-center gap-2 text-xs font-medium">
                <span className="bg-accent h-2 w-2 rounded-full" aria-hidden />
                Online
              </span>
            </div>

            <div className="border-border-subtle mb-4 flex flex-wrap gap-2 border-b pb-4">
              {STARTER_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => void sendMessage(question)}
                  disabled={isLoading}
                  className="border-border-highlight text-text-muted hover:text-text-primary disabled:opacity-60 rounded-full border px-3 py-1.5 text-xs transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            <div
              ref={messagesContainerRef}
              className="h-[420px] space-y-4 overflow-y-auto rounded-xl bg-[rgba(0,0,0,0.18)] p-3 pr-2 sm:h-[500px] sm:p-4"
            >
              {messages.map((message, idx) => (
                <div
                  key={`${message.role}-${idx}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[78%] ${
                      message.role === "user"
                        ? "bg-accent text-bg-deep font-medium"
                        : "border-border-subtle bg-bg-card text-text-primary border whitespace-pre-wrap"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading ? (
                <div className="text-text-muted text-sm">Thinking...</div>
              ) : null}
            </div>

            {error ? (
              <p className="mt-3 text-sm text-red-300">{error}</p>
            ) : null}

            <form
              onSubmit={onSubmit}
              className="border-border-subtle mt-4 flex items-end gap-3 border-t pt-4"
            >
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about roles, skills, experience, projects..."
                rows={2}
                className="border-border-highlight bg-bg-card text-text-primary placeholder:text-text-muted/80 focus:border-accent min-h-12 max-h-28 min-w-0 flex-1 resize-y rounded-xl border px-4 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="bg-accent text-bg-deep disabled:bg-accent/55 rounded-xl px-5 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
