import type { ProjectImage } from "@/components/projects/types";

export function ImageCredit({ credit }: { credit?: ProjectImage["credit"] }) {
  if (!credit) return null;
  return (
    <p className="text-xs leading-relaxed">
      <a className="underline underline-offset-2" href={credit.source} target="_blank" rel="noreferrer">{credit.label}</a>
      {" · "}<a className="underline underline-offset-2" href={credit.licenseUrl} target="_blank" rel="noreferrer">{credit.license}</a>
      {" · "}{credit.changes}
      {credit.additionalSources?.length ? <span className="block">Additional sources: {credit.additionalSources.map((item, index) => <span key={item.href}>{index > 0 ? " · " : ""}<a className="underline underline-offset-2" href={item.href} target="_blank" rel="noreferrer">{item.label}</a></span>)}</span> : null}
    </p>
  );
}
