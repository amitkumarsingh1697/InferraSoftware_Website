"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

/**
 * Share links that need no third-party scripts: LinkedIn and X share URLs,
 * email, and copy-to-clipboard.
 */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "X", href: `https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}` },
    { label: "Email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Share</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted hover:border-line-strong hover:text-fg"
            >
              {l.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-fg-muted hover:border-line-strong hover:text-fg"
          >
            {copied ? <Check aria-hidden className="h-3.5 w-3.5 text-success" /> : <Link2 aria-hidden className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy link"}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Link copied to clipboard" : ""}
          </span>
        </li>
      </ul>
    </div>
  );
}
