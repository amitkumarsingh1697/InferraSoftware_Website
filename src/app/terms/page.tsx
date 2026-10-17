import Terms from "@/content/legal/terms.mdx";
import { LegalPage } from "@/components/ui/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern use of the Inferra Software website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="2026-10-17">
      <Terms />
    </LegalPage>
  );
}
