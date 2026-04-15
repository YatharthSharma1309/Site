"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      aria-label="Save resume as PDF"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 22px",
        background: "#0f0f0f",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.02em",
        cursor: "pointer",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d="M7 1v8M4 6l3 3 3-3M2 11h10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Download PDF
    </button>
  );
}
