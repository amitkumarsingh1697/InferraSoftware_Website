/**
 * Editing hints that only render during local development, never in a
 * production build. Used where founder input is still needed.
 */
export function DevNote({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="mt-3 rounded-lg border border-dashed border-warning/50 bg-warning/5 px-3 py-2 font-mono text-[0.7rem] leading-relaxed text-warning" data-dev-note>
      DEV · {children}
    </p>
  );
}
