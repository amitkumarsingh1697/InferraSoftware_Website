import { Suspense } from "react";
import { CalendarDays, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { DevNote } from "@/components/ui/dev-note";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { getBookingUrl, siteConfig } from "@/config/site";
import { messaging } from "@/config/messaging";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Project Enquiry",
  description:
    "Discuss a software project with Inferra Software. Call +91 98918 55259 or send a project, partnership or career enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  const booking = getBookingUrl();
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">what you&apos;re building</span>
          </>
        }
        intro="The fastest way to reach us is by phone. If you prefer to write, the enquiry form takes a couple of minutes and goes straight to the people who would do the work."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <aside className="space-y-5" aria-label="Contact details">
            <a
              href={`tel:${contact.phoneE164}`}
              className="group panel brackets block p-6 transition-colors hover:border-cyan/50"
              data-track="call_click"
              data-track-label="contact_page"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/50 bg-cyan/10">
                <Phone aria-hidden className="h-5 w-5 text-cyan" />
              </span>
              <span className="mt-4 block font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Call us</span>
              <span className="mt-1 block font-display text-2xl font-semibold text-fg group-hover:text-cyan">{contact.phoneDisplay}</span>
              <span className="mt-2 block text-sm text-fg-muted">Talk to the team directly about your project.</span>
              {contact.availability && (
                <span className="mt-3 flex items-center gap-2 text-xs text-fg-subtle">
                  <Clock aria-hidden className="h-3.5 w-3.5" /> {contact.availability}
                </span>
              )}
            </a>

            {contact.email ? (
              <a href={`mailto:${contact.email}`} className="panel flex items-center gap-4 p-5 hover:border-line-strong">
                <Mail aria-hidden className="h-5 w-5 text-violet-bright" />
                <span>
                  <span className="block text-xs text-fg-subtle">Email</span>
                  <span className="text-fg">{contact.email}</span>
                </span>
              </a>
            ) : (
              <DevNote>Business email not configured. Set contact.email in src/config/site.ts to show it here.</DevNote>
            )}

            {contact.address && (
              <div className="panel flex items-start gap-4 p-5">
                <MapPin aria-hidden className="mt-0.5 h-5 w-5 text-violet-bright" />
                <span>
                  <span className="block text-xs text-fg-subtle">Address</span>
                  <address className="not-italic text-fg">{contact.address}</address>
                </span>
              </div>
            )}

            {booking ? (
              <a
                href={booking}
                target="_blank"
                rel="noopener noreferrer"
                className="panel flex items-center gap-4 p-5 hover:border-line-strong"
                data-track="booking_click"
                data-track-label="contact_page"
              >
                <CalendarDays aria-hidden className="h-5 w-5 text-violet-bright" />
                <span>
                  <span className="block text-fg">{messaging.ctas.book}</span>
                  <span className="block text-xs text-fg-subtle">Choose a time that suits you (opens a new tab)</span>
                </span>
              </a>
            ) : (
              <DevNote>Booking link not configured. Set NEXT_PUBLIC_BOOKING_URL to show a &quot;Book a call&quot; option.</DevNote>
            )}

            <div className="rounded-[var(--radius-panel)] border border-line p-5">
              <h2 className="font-display text-base font-semibold">What happens next</h2>
              <ol className="mt-3 space-y-2.5 text-sm text-fg-muted">
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-cyan">01</span> We read your message and reply personally.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-cyan">02</span> A short call to understand goals, constraints and fit.
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs text-cyan">03</span> If we can help, a proposed approach and next steps.
                </li>
              </ol>
            </div>

            <p className="flex gap-3 text-xs leading-relaxed text-fg-subtle">
              <ShieldCheck aria-hidden className="h-4 w-4 shrink-0 text-violet-bright" />
              We use your details only to respond to your enquiry. Happy to sign an NDA before detailed discussions.
            </p>
          </aside>

          <div>
            <Suspense fallback={<div className="panel h-[640px] animate-pulse" aria-hidden />}>
              <EnquiryForm phone={{ display: contact.phoneDisplay, e164: contact.phoneE164 }} email={contact.email} bookingUrl={booking} />
            </Suspense>
          </div>
        </div>
      </Container>
    </>
  );
}
