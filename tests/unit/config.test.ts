import { afterEach, describe, expect, it, vi } from "vitest";
import { getBookingUrl, getSocialLinks, isSafeExternalUrl, siteConfig } from "@/config/site";
import { messaging } from "@/config/messaging";

afterEach(() => vi.unstubAllEnvs());

describe("site configuration", () => {
  it("uses the confirmed phone number as the primary contact", () => {
    expect(siteConfig.contact.phoneE164).toBe("+919891855259");
    expect(siteConfig.contact.phoneDisplay.replace(/\s/g, "")).toBe("+919891855259");
  });

  it("does not ship placeholder contact details", () => {
    expect(siteConfig.contact.email).toBeNull();
    expect(siteConfig.contact.address).toBeNull();
  });

  it("keeps the slogan in configuration", () => {
    expect(messaging.slogan).toBe("Complex ideas. Engineered into reality.");
  });
});

describe("isSafeExternalUrl", () => {
  it("accepts https only", () => {
    expect(isSafeExternalUrl("https://cal.com/inferra")).toBe(true);
    expect(isSafeExternalUrl("http://cal.com/inferra")).toBe(false);
    expect(isSafeExternalUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalUrl("not a url")).toBe(false);
  });
});

describe("getBookingUrl", () => {
  it("is null until configured", () => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "");
    expect(getBookingUrl()).toBeNull();
  });
  it("reads an https URL from the environment", () => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "https://calendly.com/example");
    expect(getBookingUrl()).toBe("https://calendly.com/example");
  });
  it("ignores unsafe URLs", () => {
    vi.stubEnv("NEXT_PUBLIC_BOOKING_URL", "javascript:alert(1)");
    expect(getBookingUrl()).toBeNull();
  });
});

describe("getSocialLinks", () => {
  it("returns nothing while no profiles are configured", () => {
    expect(getSocialLinks()).toEqual([]);
  });
});
