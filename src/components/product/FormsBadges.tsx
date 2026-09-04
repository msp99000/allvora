import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { cn } from "@/lib/utils";

export function FormsBadges({
  forms,
  label = "Available forms",
  className,
}: {
  forms: string[];
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      {label ? <Eyebrow className="mb-2.5">{label}</Eyebrow> : null}
      <ul className="flex flex-wrap gap-2">
        {forms.map((form) => (
          <li key={form}>
            <Badge variant="form">{form}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
