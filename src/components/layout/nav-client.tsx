"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Phone, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import type { NavLink } from "@/config/navigation";

type Item = NavLink & { menu?: "services"; desktop?: "always" | "xl" };
type ServicesMenu = {
  pillar: string;
  label: string;
  code: string;
  tagline: string;
  items: { label: string; href: string; summary: string }[];
}[];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">{children}</div>
    </header>
  );
}

export function DesktopNav({ items, servicesMenu, ctaLabel }: { items: Item[]; servicesMenu: ServicesMenu; ctaLabel: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Close the menu after navigation (state reset during render, not in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const hoverOpenedAt = useRef(0);
  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = Date.now();
    setOpen(true);
  };
  // A click that lands right after hover opened the menu should keep it open,
  // not toggle it shut again.
  const toggle = () => setOpen((v) => (v && Date.now() - hoverOpenedAt.current < 500 ? true : !v));
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <nav aria-label="Primary" className="hidden flex-1 items-center justify-end gap-2 lg:flex">
      <ul className="flex items-center gap-0.5">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          const visibility = item.desktop === "xl" ? "hidden xl:block" : "block";
          if (item.menu === "services") {
            return (
              <li key={item.href} ref={wrapRef} onMouseEnter={openNow} onMouseLeave={closeSoon}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={toggle}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors",
                    active || open ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
                </button>
                <div
                  id={panelId}
                  hidden={!open}
                  className="absolute inset-x-0 top-full px-4 pt-1 sm:px-6 lg:px-8"
                >
                  <div className="panel overflow-hidden bg-ink-2/95 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
                    <div className="grid grid-cols-5 gap-px bg-line">
                      {servicesMenu.map((group) => (
                        <div key={group.pillar} className="bg-ink-2 p-5">
                          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-cyan">{group.code}</p>
                          <p className="mt-1 font-display text-sm font-semibold text-fg">{group.label}</p>
                          <p className="mt-1 text-xs leading-snug text-fg-subtle">{group.tagline}</p>
                          <ul className="mt-4 space-y-1">
                            {group.items.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  className={cn(
                                    "block rounded-md px-2 py-1.5 -mx-2 text-sm leading-snug transition-colors hover:bg-white/5 hover:text-fg",
                                    pathname === s.href ? "text-fg" : "text-fg-muted",
                                  )}
                                >
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
                      <p className="text-xs text-fg-subtle">Not sure where your challenge fits? We can help you scope it.</p>
                      <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-bright hover:text-fg">
                        All services <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          }
          return (
            <li key={item.href} className={visibility}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("relative rounded-full px-3 py-2 text-sm transition-colors", active ? "text-fg" : "text-fg-muted hover:text-fg")}
              >
                {item.label}
                {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-violet-bright to-cyan" />}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/contact" className={buttonClasses("primary", "ml-3 px-4")} data-track="cta_click" data-track-label="header">
        {ctaLabel}
      </Link>
    </nav>
  );
}

export function MobileNav({
  items,
  servicesMenu,
  ctaLabel,
  phone,
}: {
  items: Item[];
  servicesMenu: ServicesMenu;
  ctaLabel: string;
  phone: { display: string; e164: string };
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const openMenu = () => dialogRef.current?.showModal();

  useEffect(() => close(), [pathname, close]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={openMenu}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg"
        aria-haspopup="dialog"
        aria-label="Open menu"
      >
        <Menu aria-hidden className="h-5 w-5" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-fg backdrop:bg-ink/80 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
          <span className="font-mono text-xs tracking-[0.2em] text-fg-subtle">MENU</span>
          <button
            type="button"
            onClick={close}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line"
            aria-label="Close menu"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <ul className="space-y-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              if (item.menu === "services") {
                return (
                  <li key={item.href}>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-display text-xl font-medium"
                    >
                      {item.label}
                      <ChevronDown aria-hidden className={cn("h-5 w-5 text-fg-muted transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    <div id="mobile-services" hidden={!servicesOpen} className="pb-3 pl-3">
                      <Link href="/services" className="block rounded-lg px-3 py-2 text-sm font-medium text-violet-bright">
                        All services
                      </Link>
                      {servicesMenu.map((group) => (
                        <div key={group.pillar} className="mt-3">
                          <p className="px-3 font-mono text-[0.65rem] tracking-[0.2em] text-cyan">
                            {group.code} · {group.label.toUpperCase()}
                          </p>
                          <ul className="mt-1">
                            {group.items.map((s) => (
                              <li key={s.href}>
                                <Link href={s.href} className="block rounded-lg px-3 py-2 text-[0.95rem] text-fg-muted hover:text-fg">
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("block rounded-xl px-3 py-3 font-display text-xl font-medium", active ? "text-fg" : "text-fg-muted")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="shrink-0 space-y-3 border-t border-line p-4 sm:p-6">
          <Link href="/contact" className={buttonClasses("primary", "w-full")} data-track="cta_click" data-track-label="mobile_menu">
            {ctaLabel}
          </Link>
          <a href={`tel:${phone.e164}`} className={buttonClasses("secondary", "w-full")} data-track="call_click" data-track-label="mobile_menu">
            <Phone aria-hidden className="h-4 w-4" /> {phone.display}
          </a>
        </div>
      </dialog>
    </div>
  );
}
