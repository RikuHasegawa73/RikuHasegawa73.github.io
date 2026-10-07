import type { SimpleIcon } from "simple-icons";
import type { SVGProps } from "react";

/** 色の明るさ(0〜1)。暗すぎるロゴはダークモードで見えなくなるため判定に使う */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Simple Icons(CC0)のロゴを、技術の欄で使うアイコン部品にする。
 * ブランドの色で塗り、ほぼ黒のロゴだけは文字と同じ色にしてダークモードでも見えるようにする。
 */
export function makeSimpleIcon(icon: SimpleIcon) {
  const fill = luminance(icon.hex) < 0.15 ? "currentColor" : `#${icon.hex}`;
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg role="img" viewBox="0 0 24 24" aria-label={icon.title} {...props}>
        <path d={icon.path} fill={fill} />
      </svg>
    );
  }
  Icon.displayName = `SimpleIcon(${icon.title})`;
  return Icon;
}
