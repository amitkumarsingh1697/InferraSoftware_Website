import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { primaryNav, servicesMenu } from "@/config/navigation";
import { messaging } from "@/config/messaging";
import { siteConfig } from "@/config/site";
import { HeaderShell, DesktopNav, MobileNav } from "./nav-client";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Link href="/" className="relative z-10 shrink-0 rounded-md" aria-label={`${siteConfig.name}, home`}>
        <Logo />
      </Link>
      <DesktopNav items={primaryNav} servicesMenu={servicesMenu} ctaLabel={messaging.ctas.discuss} />
      <MobileNav
        items={primaryNav}
        servicesMenu={servicesMenu}
        ctaLabel={messaging.ctas.discuss}
        phone={{ display: siteConfig.contact.phoneDisplay, e164: siteConfig.contact.phoneE164 }}
      />
    </HeaderShell>
  );
}
