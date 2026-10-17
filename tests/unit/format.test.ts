import { describe, expect, it } from "vitest";
import { enquirySchema } from "@/lib/enquiry/schema";
import { enquiryHtml, enquirySubject, enquiryText, escapeHtml, headerSafe } from "@/lib/enquiry/format";

describe("escapeHtml", () => {
  it("escapes HTML metacharacters", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'y'`)).toBe("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;");
  });
});

describe("headerSafe", () => {
  it("removes line breaks to prevent header injection", () => {
    expect(headerSafe("Hello\r\nBcc: victim@example.com")).toBe("Hello Bcc: victim@example.com");
  });
  it("truncates long values", () => {
    expect(headerSafe("x".repeat(500), 20)).toHaveLength(20);
  });
});

describe("enquiry email formatting", () => {
  const enquiry = enquirySchema.parse({
    fullName: "<b>Mallory</b>",
    email: "m@example.com",
    company: "Evil\nCorp",
    region: "India",
    service: "sap-basis",
    projectType: "sap",
    message: "Please <img src=x onerror=alert(1)> review our SAP landscape upgrade plan.",
    engagementModel: "advisory",
    referral: "other",
    consent: true,
  });

  it("escapes user content in the HTML body", () => {
    const html = enquiryHtml(enquiry, "INF-TEST");
    expect(html).not.toContain("<img src=x");
    expect(html).not.toContain("<b>Mallory</b>");
    expect(html).toContain("&lt;b&gt;Mallory&lt;/b&gt;");
  });

  it("produces a single-line subject with the reference id", () => {
    const subject = enquirySubject(enquiry, "INF-TEST");
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toContain("INF-TEST");
  });

  it("includes human-readable labels in the text body", () => {
    expect(enquiryText(enquiry, "INF-TEST")).toContain("SAP Development & BASIS Services");
  });
});
