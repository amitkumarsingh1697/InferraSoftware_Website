import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { formatDate } from "@/lib/utils";

/** Set `draft={false}` once a qualified legal adviser has reviewed the document. */
export function LegalPage({
  title,
  path,
  updated,
  draft = true,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={[{ name: title, path }]} eyebrow="Legal" title={title}>
        <p className="mt-5 font-mono text-xs text-fg-subtle">
          Last updated <time dateTime={updated}>{formatDate(updated)}</time>
        </p>
      </PageHero>
      <Container className="py-14 sm:py-16">
        {draft && (
          <div role="note" className="mb-10 flex max-w-[72ch] gap-3 rounded-xl border border-warning/40 bg-warning/5 p-4 text-sm leading-relaxed text-fg-muted">
            <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <p>
              <strong className="text-fg">Draft pending legal review.</strong> This document reflects how the website currently
              handles information, but it has not yet been reviewed by a qualified legal adviser and does not claim compliance
              with any specific law.
            </p>
          </div>
        )}
        <div className="prose-inferra max-w-[72ch]">{children}</div>
      </Container>
    </>
  );
}
