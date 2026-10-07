"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useEntrance } from "@/lib/use-entrance";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 「作ったもの」カードの上に置く、SVG の動く図解。
 * 画面に入ったときに 1 回動き、カーソルを乗せると最初から動き直す。
 * 動きを減らす設定の人には、完成した絵を止めた状態で見せる。
 */

const EASE = [0.22, 1, 0.36, 1] as const;
/** SVG 要素を自分の中心で拡大縮小させる */
const CENTER = { transformBox: "fill-box", transformOrigin: "center" } as const;

const draw = (delay: number, duration = 0.6): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration, delay, ease: EASE } },
});

const pop = (delay: number): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 420, damping: 24, delay } },
});

const fade = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, delay } },
});

function Stage({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [run, setRun] = useState(0);
  // カーソルを乗せるたびに svg を作り直し(key)、最初から動かし直す
  const entrance = useEntrance(inView, run);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setRun((r) => r + 1)}
      className={cn("h-40 border-b border-border bg-muted/40 text-foreground", className)}
    >
      <motion.svg
        key={run}
        role="img"
        aria-label={label}
        viewBox="0 0 320 160"
        className="size-full"
        initial="hidden"
        animate={entrance}
      >
        {children}
      </motion.svg>
    </div>
  );
}

/** 帳票の上を読み取りの線が走り、行ごとにチェックが付いて CSV・PDF が出てくる */
function CheckerIllustration({ className }: { className?: string }) {
  const rows = [0, 1, 2, 3, 4];
  return (
    <Stage label="帳票を読み取って検証し、CSV と PDF に出力する図" className={className}>
      <motion.g variants={fade(0)}>
        <rect x="96" y="16" width="128" height="128" rx="10" className="fill-background stroke-foreground/15" />
        <rect x="110" y="30" width="56" height="8" rx="4" className="fill-foreground/70" />
        {rows.map((i) => (
          <rect key={i} x="110" y={52 + i * 18} width={70 - (i % 2) * 18} height="6" rx="3" className="fill-foreground/15" />
        ))}
      </motion.g>
      {rows.map((i) => (
        <motion.g key={i} variants={pop(0.55 + i * 0.22)} style={CENTER}>
          <circle cx="202" cy={55 + i * 18} r="7" className="fill-emerald-500" />
          <motion.path
            d={`M198.5 ${55 + i * 18} l2.5 2.5 l4.5 -5`}
            className="stroke-white"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw(0.7 + i * 0.22, 0.3)}
          />
        </motion.g>
      ))}
      <motion.rect
        x="100"
        width="120"
        height="2"
        rx="1"
        className="fill-blue-500"
        variants={{
          hidden: { y: 44, opacity: 0 },
          show: {
            y: [44, 140],
            opacity: [0, 1, 1, 0],
            transition: { duration: 1.4, delay: 0.3, ease: "linear" },
          },
        }}
      />
      {[
        { label: "CSV", y: 52, color: "fill-emerald-500" },
        { label: "PDF", y: 92, color: "fill-blue-500" },
      ].map((out, i) => (
        <motion.g
          key={out.label}
          variants={{
            hidden: { x: -12, opacity: 0 },
            show: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 1.7 + i * 0.15, ease: EASE } },
          }}
        >
          <rect x="242" y={out.y} width="46" height="26" rx="6" className={out.color} />
          <text x="265" y={out.y + 17} textAnchor="middle" className="fill-white text-[11px] font-semibold">
            {out.label}
          </text>
        </motion.g>
      ))}
      <motion.path
        d="M226 80 H238"
        className="stroke-foreground/30"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw(1.6, 0.3)}
      />
    </Stage>
  );
}

/** フォルダの木構造が、根から順に枝分かれして開いていく */
function DocsIllustration({ className }: { className?: string }) {
  const nodes = [
    { x: 40, y: 80, d: 0.1 },
    { x: 134, y: 40, d: 0.55 },
    { x: 134, y: 80, d: 0.65 },
    { x: 134, y: 120, d: 0.75 },
    { x: 228, y: 26, d: 1.15 },
    { x: 228, y: 54, d: 1.25 },
    { x: 228, y: 106, d: 1.35 },
    { x: 228, y: 134, d: 1.45 },
  ];
  const links = [
    { d: "M58 80 H86 V40 H116", delay: 0.3 },
    { d: "M86 80 H116", delay: 0.35 },
    { d: "M86 80 V120 H116", delay: 0.4 },
    { d: "M152 40 H180 V26 H210", delay: 0.9 },
    { d: "M180 40 V54 H210", delay: 0.95 },
    { d: "M152 120 H180 V106 H210", delay: 1.05 },
    { d: "M180 120 V134 H210", delay: 1.1 },
  ];
  return (
    <Stage label="フォルダが階層状に広がっていく文書管理の図" className={className}>
      {links.map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          fill="none"
          className="stroke-foreground/25"
          strokeWidth="1.5"
          strokeLinejoin="round"
          variants={draw(l.delay, 0.5)}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={i} variants={pop(n.d)} style={CENTER}>
          <path
            d={`M${n.x - 12} ${n.y - 6} a2 2 0 0 1 2 -2 h6 l3 3 h11 a2 2 0 0 1 2 2 v11 a2 2 0 0 1 -2 2 h-20 a2 2 0 0 1 -2 -2 z`}
            className={i === 0 ? "fill-blue-500" : i < 4 ? "fill-blue-400/80" : "fill-amber-400"}
          />
        </motion.g>
      ))}
      <motion.g variants={fade(1.7)}>
        {[26, 54, 106, 134].map((y) => (
          <rect key={y} x="250" y={y - 2} width="40" height="4" rx="2" className="fill-foreground/15" />
        ))}
      </motion.g>
    </Stage>
  );
}

/** 決まった順番に見える乱数(毎回同じ絵になるようにする) */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

const QR_SIZE = 17;
const QR_CELL = 7;
const QR_X = 160 - (QR_SIZE * QR_CELL) / 2;
const QR_Y = 80 - (QR_SIZE * QR_CELL) / 2;

/** 角の位置合わせマーク(と周りの余白)の範囲か */
function inFinder(r: number, c: number) {
  const top = r < 8;
  const left = c < 8;
  const right = c > QR_SIZE - 9;
  const bottom = r > QR_SIZE - 9;
  return (top && left) || (top && right) || (bottom && left);
}

const qrCells = (() => {
  const rand = seeded(7);
  const cells: { r: number; c: number; delay: number }[] = [];
  for (let r = 0; r < QR_SIZE; r++) {
    for (let c = 0; c < QR_SIZE; c++) {
      if (inFinder(r, c)) continue;
      if (rand() < 0.48) cells.push({ r, c, delay: 0.45 + rand() * 1.1 });
    }
  }
  return cells;
})();

/** QR コードのマスが、ばらばらの順に埋まって完成する */
function QrIllustration({ className }: { className?: string }) {
  const finders = [
    { r: 0, c: 0 },
    { r: 0, c: QR_SIZE - 7 },
    { r: QR_SIZE - 7, c: 0 },
  ];
  return (
    <Stage label="QR コードのマスが埋まっていく図" className={className}>
      <rect
        x={QR_X - 10}
        y={QR_Y - 10}
        width={QR_SIZE * QR_CELL + 20}
        height={QR_SIZE * QR_CELL + 20}
        rx="10"
        className="fill-background stroke-foreground/15"
      />
      {finders.map((f, i) => (
        <motion.g key={i} variants={pop(0.1 + i * 0.1)} style={CENTER}>
          <rect
            x={QR_X + f.c * QR_CELL + 1}
            y={QR_Y + f.r * QR_CELL + 1}
            width={7 * QR_CELL - 2}
            height={7 * QR_CELL - 2}
            rx="5"
            fill="none"
            className="stroke-foreground"
            strokeWidth={QR_CELL - 1}
          />
          <rect
            x={QR_X + (f.c + 2) * QR_CELL}
            y={QR_Y + (f.r + 2) * QR_CELL}
            width={3 * QR_CELL}
            height={3 * QR_CELL}
            rx="3"
            className="fill-blue-500"
          />
        </motion.g>
      ))}
      {qrCells.map(({ r, c, delay }) => (
        <motion.rect
          key={`${r}-${c}`}
          x={QR_X + c * QR_CELL + 0.75}
          y={QR_Y + r * QR_CELL + 0.75}
          width={QR_CELL - 1.5}
          height={QR_CELL - 1.5}
          rx="1.5"
          className="fill-foreground"
          style={CENTER}
          variants={pop(delay)}
        />
      ))}
    </Stage>
  );
}

/** カレンダーのマスに、シフトの帯が順に入っていく */
function ShiftIllustration({ className }: { className?: string }) {
  const days = ["月", "火", "水", "木", "金", "土", "日"];
  const x0 = 41;
  const y0 = 34;
  const w = 34;
  const h = 26;
  const shifts = [
    { row: 0, col: 0, span: 3, color: "fill-blue-500" },
    { row: 0, col: 4, span: 2, color: "fill-emerald-500" },
    { row: 1, col: 1, span: 2, color: "fill-amber-400" },
    { row: 1, col: 5, span: 2, color: "fill-blue-500" },
    { row: 2, col: 0, span: 2, color: "fill-emerald-500" },
    { row: 2, col: 3, span: 3, color: "fill-violet-500" },
    { row: 3, col: 2, span: 2, color: "fill-blue-500" },
    { row: 3, col: 5, span: 2, color: "fill-amber-400" },
  ];
  return (
    <Stage label="カレンダーにシフトが入っていく図" className={className}>
      <motion.g variants={fade(0)}>
        {days.map((d, i) => (
          <text
            key={d}
            x={x0 + i * w + w / 2}
            y={y0 - 8}
            textAnchor="middle"
            className="fill-foreground/50 text-[10px]"
          >
            {d}
          </text>
        ))}
        {[0, 1, 2, 3, 4].map((r) => (
          <line key={r} x1={x0} x2={x0 + 7 * w} y1={y0 + r * h} y2={y0 + r * h} className="stroke-foreground/10" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
          <line key={c} x1={x0 + c * w} x2={x0 + c * w} y1={y0} y2={y0 + 4 * h} className="stroke-foreground/10" />
        ))}
      </motion.g>
      {shifts.map((s, i) => (
        <motion.rect
          key={i}
          x={x0 + s.col * w + 3}
          y={y0 + s.row * h + 6}
          width={s.span * w - 6}
          height={h - 12}
          rx="4"
          className={s.color}
          style={{ transformBox: "fill-box", transformOrigin: "left center" }}
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            show: { scaleX: 1, opacity: 0.9, transition: { duration: 0.55, delay: 0.3 + i * 0.12, ease: EASE } },
          }}
        />
      ))}
    </Stage>
  );
}

export const ILLUSTRATIONS = {
  checker: CheckerIllustration,
  docs: DocsIllustration,
  qr: QrIllustration,
  shift: ShiftIllustration,
} as const;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

/** 冒頭のイニシャル。ページを開いたときに、ペンで書くように線が引かれる */
export function Monogram() {
  const entrance = useEntrance();
  const strokes = [
    "M24 72 V28 H40 a11 11 0 0 1 0 22 H24", // R の縦線と丸み
    "M38 50 L50 72", // R の脚
    "M60 28 V72", // H の左
    "M78 28 V72", // H の右
    "M60 50 H78", // H の横棒
  ];
  return (
    <motion.svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="RH"
      className="size-full text-foreground"
      initial="hidden"
      animate={entrance}
    >
      {strokes.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw(0.35 + i * 0.28, i === 0 ? 0.9 : 0.4)}
        />
      ))}
      <motion.circle
        cx="86"
        cy="72"
        r="3.5"
        className="fill-blue-500"
        style={CENTER}
        variants={pop(0.35 + strokes.length * 0.28)}
      />
    </motion.svg>
  );
}
