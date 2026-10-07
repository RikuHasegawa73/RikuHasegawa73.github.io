import type { LucideIcon } from "lucide-react";

/** 経歴・資格の行の左に出す丸いアイコン(会社ロゴの代わり) */
export function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div
      aria-hidden
      className="grid size-8 md:size-10 flex-none place-items-center rounded-full border bg-background shadow ring-2 ring-border text-muted-foreground"
    >
      <Icon className="size-4 md:size-[18px]" strokeWidth={1.75} />
    </div>
  );
}
