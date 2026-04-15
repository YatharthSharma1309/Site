import type { Metadata } from "next";
import {
  site,
  journey,
  education,
  certifications,
  skillGroups,
} from "@/lib/content";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: `Resume — ${site.name}`,
  description: `Professional resume of ${site.name}, ${site.role}.`,
};

export default function ResumePage() {
  const coreSkills = [...skillGroups.core].join(", ");
  const deepeningSkills = [...skillGroups.deepening].join(", ");

  return (
    <>
      {/* Print + screen overrides — scoped to this page */}
      <style>{`
        @media print {
          .no-print   { display: none !important; }
          .noise       { display: none !important; }
          body         { background: white !important; }
          *            { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page        { margin: 0.55in 0.65in; size: A4 portrait; }
          #resume-shell { background: white !important; padding: 0 !important; min-height: 0 !important; }
          #resume-paper { box-shadow: none !important; padding: 0 !important; max-width: none !important; }
        }
      `}</style>

      {/* Full-page white shell to override the dark root layout on screen */}
      <div
        id="resume-shell"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          background: "#e9ecef",
          padding: "40px 16px",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top bar — screen only */}
        <div
          className="no-print"
          style={{
            maxWidth: 800,
            margin: "0 auto 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{
              color: "#555",
              fontSize: 13,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            ← Back to site
          </a>
          <PrintButton />
        </div>

        {/* ── Resume paper ── */}
        <div
          id="resume-paper"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "white",
            color: "#111",
            padding: "52px 60px",
            boxShadow: "0 6px 48px rgba(0,0,0,0.14)",
          }}
        >
          {/* Header */}
          <header style={{ marginBottom: 18 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#0a0a0a",
              }}
            >
              {site.name}
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 14,
                fontWeight: 600,
                color: "#444",
              }}
            >
              {site.role}
            </p>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: 12,
                color: "#666",
                lineHeight: 1.6,
              }}
            >
              {site.email}&nbsp;&nbsp;·&nbsp;&nbsp;{site.location}
              &nbsp;&nbsp;·&nbsp;&nbsp;linkedin.com/in/yatharth-sharma-32a1a1200
              &nbsp;&nbsp;·&nbsp;&nbsp;github.com/YatharthSharma1309
            </p>
          </header>

          <hr
            style={{
              border: "none",
              borderTop: "2px solid #0a0a0a",
              margin: "0 0 20px",
            }}
          />

          {/* Summary */}
          <ResumeSection label="Professional Summary">
            <p
              style={{ margin: 0, color: "#333", fontSize: 13, lineHeight: 1.7 }}
            >
              {site.tagline}
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection label="Experience">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {journey.map((item) => (
                <div key={item.org + item.period}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 4,
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>
                        {item.title}
                      </span>
                      <span style={{ color: "#333", fontSize: 13 }}>
                        {" "}
                        — {item.org}
                      </span>
                      {item.location !== "—" && (
                        <span style={{ color: "#666", fontSize: 12 }}>
                          {" "}
                          · {item.location}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        color: "#666",
                        fontSize: 11.5,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.period}
                    </span>
                  </div>
                  {item.description && (
                    <ul
                      style={{
                        margin: "5px 0 0",
                        paddingLeft: 18,
                        color: "#333",
                        fontSize: 12.5,
                        lineHeight: 1.65,
                      }}
                    >
                      {item.description.map((line) => (
                        <li key={line} style={{ marginBottom: 2 }}>
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection label="Skills">
            <p
              style={{
                margin: "0 0 5px",
                fontSize: 13,
                color: "#333",
                lineHeight: 1.65,
              }}
            >
              <strong>Core: </strong>
              {coreSkills}
            </p>
            <p
              style={{ margin: 0, fontSize: 13, color: "#333", lineHeight: 1.65 }}
            >
              <strong>Developing: </strong>
              {deepeningSkills}
            </p>
          </ResumeSection>

          {/* Education */}
          <ResumeSection label="Education">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {education.map((e) => (
                <div
                  key={e.school}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 4,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>
                      {e.degree}
                    </div>
                    <div style={{ color: "#555", fontSize: 12 }}>{e.school}</div>
                  </div>
                  <span
                    style={{
                      color: "#666",
                      fontSize: 11.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {e.period}
                  </span>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection label="Certifications">
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                color: "#333",
                fontSize: 12.5,
                lineHeight: 1.65,
              }}
            >
              {certifications.map((c) => (
                <li key={c} style={{ marginBottom: 2 }}>
                  {c}
                </li>
              ))}
            </ul>
          </ResumeSection>
        </div>
      </div>
    </>
  );
}

function ResumeSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h2
        style={{
          margin: "0 0 10px",
          fontSize: 9.5,
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#111",
          borderBottom: "1px solid #ddd",
          paddingBottom: 5,
        }}
      >
        {label}
      </h2>
      {children}
    </section>
  );
}
