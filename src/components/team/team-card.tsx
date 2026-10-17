import Image from "next/image";
import { AbstractAvatar } from "@/components/art/generative";
import { DevNote } from "@/components/ui/dev-note";
import { Tag } from "@/components/ui/badge";
import { isSafeExternalUrl } from "@/config/site";
import type { TeamMember } from "@/content/types";

export function TeamCard({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
  const links = member.links.filter((l) => isSafeExternalUrl(l.href));
  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden border-b border-line">
        {member.photo ? (
          <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" className="object-cover" />
        ) : (
          <AbstractAvatar name={member.name} hue={member.hue} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{member.name}</h3>
        <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.16em] text-cyan">{member.role}</p>
        {!compact && member.bio.length > 0 && (
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-fg-muted">
            {member.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {!compact && member.expertise.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Expertise">
            {member.expertise.map((e) => (
              <li key={e}>
                <Tag>{e}</Tag>
              </li>
            ))}
          </ul>
        )}
        {!compact && links.length > 0 && (
          <ul className="mt-4 flex gap-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-violet-bright hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        {!compact && member.bio.length === 0 && <DevNote>Profile details pending. Add bio, expertise and links in src/content/team.ts.</DevNote>}
        {!compact && !member.photo && <DevNote>Abstract avatar shown. Add a real photo via the photo field when available.</DevNote>}
      </div>
    </article>
  );
}
