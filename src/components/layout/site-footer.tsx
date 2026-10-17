import Link from "next/link";
import { Phone, Mail, CalendarDays, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/section";
import { footerNav } from "@/config/navigation";
import { messaging } from "@/config/messaging";
import { getBookingUrl, getSocialLinks, siteConfig } from "@/config/site";
import { COPYRIGHT_YEAR } from "@/config/build-info";

export function SiteFooter() {
  const booking = getBookingUrl();
  const socials = getSocialLinks();
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label={`${siteConfig.name}, home`} className="inline-block rounded-md">
              <Logo />
            </Link>
            <p className="mt-6 font-display text-xl font-medium text-fg">{messaging.slogan}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">{messaging.positioning}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a href={`tel:${siteConfig.contact.phoneE164}`} className="inline-flex items-center gap-2 text-fg hover:text-cyan" data-track="call_click" data-track-label="footer">
                  <Phone aria-hidden className="h-4 w-4 text-violet-bright" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              {siteConfig.contact.email && (
                <li>
                  <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-2 text-fg hover:text-cyan">
                    <Mail aria-hidden className="h-4 w-4 text-violet-bright" />
                    {siteConfig.contact.email}
                  </a>
                </li>
              )}
              {siteConfig.contact.address && (
                <li className="flex items-start gap-2 text-fg-muted">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-violet-bright" />
                  <address className="not-italic">{siteConfig.contact.address}</address>
                </li>
              )}
              {booking && (
                <li>
                  <a href={booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg hover:text-cyan" data-track="booking_click" data-track-label="footer">
                    <CalendarDays aria-hidden className="h-4 w-4 text-violet-bright" />
                    {messaging.ctas.book}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={`Footer ${group.title.toLowerCase()}`}>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {siteConfig.legalName ?? siteConfig.name}. All rights reserved.
          </p>
          {socials.length > 0 && (
            <ul className="flex gap-4">
              {socials.map((s) => (
                <li key={s.network}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-fg">
                    {s.network === "x" ? "X" : s.network === "linkedin" ? "LinkedIn" : s.network === "github" ? "GitHub" : s.network}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
