import { describe, expect, it } from "vitest";
import { enquirySchema, fieldErrors, stepOneFields } from "@/lib/enquiry/schema";

const valid = {
  enquiryType: "project",
  fullName: "Test Person",
  email: "Test.Person@Example.com",
  company: "Example Ltd",
  jobTitle: "CTO",
  region: "United Kingdom",
  service: "ai-llm-engineering",
  projectType: "ai-automation",
  message: "We would like to add retrieval-augmented search to our internal knowledge base.",
  engagementModel: "project",
  referral: "search",
  consent: true,
};

describe("enquirySchema", () => {
  it("accepts a complete project enquiry and normalises values", () => {
    const r = enquirySchema.safeParse({ ...valid, fullName: "  Test\u0007   Person ", budget: "25k-50k" });
    expect(r.success).toBe(true);
    if (!r.success) return;
    expect(r.data.email).toBe("test.person@example.com");
    expect(r.data.fullName).toBe("Test Person");
    expect(r.data.website).toBe("");
  });

  it("requires consent", () => {
    const r = enquirySchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
    if (!r.success) expect(fieldErrors(r.error).consent).toMatch(/privacy policy/);
  });

  it("rejects invalid email, short message and unknown options", () => {
    const r = enquirySchema.safeParse({ ...valid, email: "not-an-email", message: "too short", service: "hacking", region: "Atlantis" });
    expect(r.success).toBe(false);
    if (!r.success) {
      const errs = fieldErrors(r.error);
      expect(Object.keys(errs).sort()).toEqual(["email", "message", "region", "service"]);
    }
  });

  it("requires a company for project enquiries but not careers", () => {
    const project = enquirySchema.safeParse({ ...valid, company: "" });
    expect(project.success).toBe(false);
    if (!project.success) expect(fieldErrors(project.error).company).toBeDefined();

    const careers = enquirySchema.safeParse({ ...valid, enquiryType: "careers", company: "", service: "not-sure", projectType: "other", engagementModel: "not-sure" });
    expect(careers.success).toBe(true);
  });

  it("allows only https portfolio links", () => {
    expect(enquirySchema.safeParse({ ...valid, portfolioUrl: "javascript:alert(1)" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, portfolioUrl: "http://example.com" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, portfolioUrl: "https://example.com/cv" }).success).toBe(true);
  });

  it("caps message length", () => {
    expect(enquirySchema.safeParse({ ...valid, message: "a".repeat(5001) }).success).toBe(false);
  });

  it("keeps step one fields in sync with the schema", () => {
    const keys = Object.keys(enquirySchema.shape);
    for (const f of stepOneFields) expect(keys).toContain(f);
  });
});
