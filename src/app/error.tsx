"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import { Container } from "@/components/ui/section";
import { buttonClasses } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log only the digest; never echo error details to visitors.
    if (error.digest) console.error("Render error", error.digest);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center pt-24">
      <Container>
        <p className="font-mono text-sm tracking-[0.2em] text-warning">UNEXPECTED ERROR</p>
        <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">Something went wrong on our side.</h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-muted">
          Please try again. If the problem continues, you can still reach us by phone from the contact page.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className={buttonClasses("primary")}>
            <RefreshCcw aria-hidden className="h-4 w-4" /> Try again
          </button>
          <Link href="/contact" className={buttonClasses("secondary")}>
            Contact us
          </Link>
        </div>
      </Container>
    </section>
  );
}
