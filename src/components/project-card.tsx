/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ILLUSTRATIONS, type IllustrationName } from "@/components/illustrations";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  /** 画像・動画の代わりに上部に出す SVG の図解 */
  illustration?: IllustrationName;
  /** 一番見せたい作品。パソコンでは横長のカードにする */
  featured?: boolean;
  /** 名前の横に出す印(例: 個人開発・公開中) */
  badge?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

function LinkBadges({ links }: { links: NonNullable<Props["links"]> }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Badge
            className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
            variant="default"
          >
            {link.icon}
            {link.type}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

/** 画像・動画がある作品だけ上部にメディアを出す。リンクの無い作品は押せる見た目にしない */
export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  illustration,
  featured = false,
  badge,
  links,
  className,
}: Props) {
  const hasMedia = Boolean(video || image || illustration);
  const Illustration = illustration ? ILLUSTRATIONS[illustration] : null;
  const hasLinks = Boolean(links && links.length > 0);

  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border rounded-xl overflow-hidden transition-all duration-200",
        featured && "sm:flex-row",
        href && "hover:ring-2 hover:ring-muted",
        className
      )}
    >
      {hasMedia && (
        <div className={cn("relative shrink-0", featured && "sm:w-[46%]")}>
          {Illustration ? (
            <Illustration className={featured ? "h-48 sm:h-full sm:min-h-64 sm:border-b-0 sm:border-r" : undefined} />
          ) : video ? (
            <video src={video} autoPlay loop muted playsInline className="w-full h-48 object-cover" />
          ) : (
            image && <ProjectImage src={image} alt={title} />
          )}
          {hasLinks && links && (
            <div className="absolute top-2 right-2">
              <LinkBadges links={links} />
            </div>
          )}
        </div>
      )}
      <div className={cn("p-6 flex flex-col gap-3 flex-1", featured && "sm:p-8")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={cn("font-semibold", featured && "text-lg")}>{title}</h3>
              {badge && (
                <Badge variant="outline" className="h-5 border-emerald-500/40 bg-emerald-500/10 px-2 text-[11px] text-emerald-700 dark:text-emerald-300">
                  {badge}
                </Badge>
              )}
            </div>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          {href && (
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              aria-label={`${title} を開く`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
        <div data-featured={featured} className="text-xs data-[featured=true]:sm:text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {!hasMedia && hasLinks && links && <LinkBadges links={links} />}
      </div>
    </div>
  );
}
