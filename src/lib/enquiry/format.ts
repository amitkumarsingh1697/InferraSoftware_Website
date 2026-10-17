import { siteConfig } from "@/config/site";
import { budgetRanges, engagementModels, enquiryTypes, labelFor, projectTypes, referralSources, serviceOptions, timelines } from "./options";
import type { Enquiry } from "./schema";

/** Escape text for safe inclusion in HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Header values must never contain line breaks (prevents header injection). */
export function headerSafe(value: string, max = 150): string {
  return value.replace(/[\r\n\t\u0000-\u001F\u007F]+/g, " ").trim().slice(0, max);
}

export function enquiryRows(e: Enquiry): [string, string][] {
  const rows: [string, string][] = [
    ["Enquiry type", labelFor(enquiryTypes, e.enquiryType)],
    ["Name", e.fullName],
    ["Email", e.email],
    ["Company", e.company || "Not provided"],
    ["Job title", e.jobTitle || "Not provided"],
    ["Country / region", e.region],
    ["Service of interest", labelFor(serviceOptions, e.service)],
    ["Project type", labelFor(projectTypes, e.projectType)],
    ["Engagement model", labelFor(engagementModels, e.engagementModel)],
    ["Budget range", labelFor(budgetRanges, e.budget)],
    ["Timeline", labelFor(timelines, e.timeline)],
    ["Heard about us via", labelFor(referralSources, e.referral)],
  ];
  if (e.portfolioUrl) rows.push(["CV / portfolio link", e.portfolioUrl]);
  const a = e.attribution;
  if (a) {
    const parts = Object.entries(a)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`);
    if (parts.length) rows.push(["Attribution", parts.join(", ")]);
  }
  return rows;
}

export function enquirySubject(e: Enquiry, id: string): string {
  const kind = e.enquiryType === "partnership" ? "Partnership" : e.enquiryType === "careers" ? "Careers" : "Project";
  return headerSafe(`[${siteConfig.shortName} ${kind}] ${e.fullName}${e.company ? ` · ${e.company}` : ""} (${id})`);
}

export function enquiryText(e: Enquiry, id: string): string {
  const rows = enquiryRows(e)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `New enquiry ${id}\n\n${rows}\n\nMessage:\n${e.message}\n`;
}

export function enquiryHtml(e: Enquiry, id: string): string {
  const rows = enquiryRows(e)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#111">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const message = escapeHtml(e.message).replace(/\n/g, "<br>");
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5">
<h2 style="margin:0 0 12px">New enquiry <span style="color:#7C3AED">${escapeHtml(id)}</span></h2>
<table style="border-collapse:collapse">${rows}</table>
<h3 style="margin:20px 0 8px">Message</h3>
<div style="white-space:normal;border-left:3px solid #7C3AED;padding-left:12px">${message}</div>
</body></html>`;
}
