"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEntrance } from "@/lib/use-entrance";
import { useId } from "react";

/**
 * ヒーローに置く、業務システムの構成図(斜め上から見た立体図)。
 * 下から インフラ → DB → API → 画面 の順に積み上がり、層の間をデータの粒が流れる。
 * マウスのある端末では、カーソルに合わせて図が少し傾く。
 */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
/** 図の原点(底面の中心)の画面座標 */
const OX = 190;
const OY = 372;
const EASE = [0.22, 1, 0.36, 1] as const;

type Pt = [number, number];
/** 立体の座標 (x, y, 高さ z) を画面の座標に変換する */
const iso = (x: number, y: number, z: number): Pt => [
  OX + (x - y) * COS,
  OY + (x + y) * SIN - z,
];
const poly = (pts: Pt[]) => pts.map((p) => p.join(",")).join(" ");

type Layer = {
  key: string;
  label: string;
  tech: string;
  size: number;
  height: number;
  z: number;
  top: string;
  left: string;
  right: string;
  /** スマホの凡例に出す色 */
  legend: string;
};

const LAYERS: Layer[] = [
  {
    key: "infra",
    legend: "bg-slate-400",
    label: "インフラ",
    tech: "AWS・Azure・Terraform",
    size: 210,
    height: 14,
    z: 0,
    top: "fill-slate-200 dark:fill-slate-700",
    left: "fill-slate-300 dark:fill-slate-800",
    right: "fill-slate-400 dark:fill-slate-900",
  },
  {
    key: "db",
    legend: "bg-emerald-500",
    label: "データベース",
    tech: "PostgreSQL・MySQL",
    size: 120,
    height: 26,
    z: 92,
    top: "fill-emerald-400",
    left: "fill-emerald-500",
    right: "fill-emerald-600",
  },
  {
    key: "api",
    legend: "bg-blue-500",
    label: "API",
    tech: "NestJS・Laravel・Spring Boot",
    size: 140,
    height: 28,
    z: 180,
    top: "fill-blue-400",
    left: "fill-blue-500",
    right: "fill-blue-600",
  },
  {
    key: "ui",
    legend: "bg-zinc-300 dark:bg-zinc-600",
    label: "画面",
    tech: "Next.js・React・Angular",
    size: 168,
    height: 8,
    z: 268,
    top: "fill-white dark:fill-zinc-900",
    left: "fill-zinc-200 dark:fill-zinc-700",
    right: "fill-zinc-300 dark:fill-zinc-800",
  },
];

/** 積み上がる順(下から)の開始時刻 */
const dropDelay = (i: number) => 0.25 + i * 0.28;
const BUILT = dropDelay(LAYERS.length - 1) + 0.6;

const drop = (i: number): Variants => ({
  hidden: { y: -46, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: dropDelay(i),
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
});

function Block({
  layer,
  index,
  reduced,
}: {
  layer: Layer;
  index: number;
  reduced: boolean;
}) {
  const h = layer.size / 2;
  const z0 = layer.z;
  const z1 = layer.z + layer.height;
  const B0 = iso(h, -h, z0);
  const C0 = iso(h, h, z0);
  const D0 = iso(-h, h, z0);
  const A1 = iso(-h, -h, z1);
  const B1 = iso(h, -h, z1);
  const C1 = iso(h, h, z1);
  const D1 = iso(-h, h, z1);
  return (
    <motion.g variants={drop(index)}>
      <polygon points={poly([B0, C0, C1, B1])} className={layer.right} />
      <polygon points={poly([C0, D0, D1, C1])} className={layer.left} />
      <polygon points={poly([A1, B1, C1, D1])} className={layer.top} />
      {layer.key === "ui" && (
        <Dashboard size={layer.size} z={z1} reduced={reduced} />
      )}
      {layer.key === "db" && <DbRings size={layer.size} z0={z0} z1={z1} />}
    </motion.g>
  );
}

/** 管理画面の動きがずっと続くことを表す共通の設定(組み上がった後に始める) */
const live = (delay: number, duration: number) =>
  ({
    delay: BUILT + delay,
    duration,
    repeat: Infinity,
    ease: "easeInOut",
  }) as const;

/**
 * 画面の層の上面に、管理画面(ヘッダー・メニュー・表・グラフ)を斜めに描く。
 * 組み上がった後は、グラフが伸び縮みし、表のハイライトが行を移り、ヘッダーに読み込みの光が流れ続ける。
 */
function Dashboard({
  size,
  z,
  reduced,
}: {
  size: number;
  z: number;
  reduced: boolean;
}) {
  const h = size / 2;
  const [ox, oy] = iso(0, 0, z);
  // 上面の平面 (x, y) を画面座標へ写す変換
  const matrix = `matrix(${COS},${SIN},${-COS},${SIN},${ox},${oy})`;
  const clipId = useId();
  const rows = [0, 1, 2, 3];
  const bars = [26, 40, 18, 34, 46];
  /** 各棒が伸び縮みする比率(データが更新されているように見せる) */
  const swings = [
    [1, 0.55, 0.9, 0.7],
    [1, 0.7, 0.45, 0.85],
    [1, 1.6, 1.1, 1.4],
    [1, 0.6, 1.15, 0.8],
    [1, 0.75, 0.5, 0.9],
  ];
  const headerWidth = size - 16;
  const rowTop = -h + 28;
  return (
    <g transform={matrix}>
      <clipPath id={clipId}>
        <rect x={-h + 8} y={-h + 8} width={headerWidth} height="14" rx="3" />
      </clipPath>
      <rect
        x={-h + 8}
        y={-h + 8}
        width={headerWidth}
        height="14"
        rx="3"
        className="fill-blue-500"
      />
      {/* サーバーとブラウザで HTML を揃えるため、要素は常に描き、動かすかだけを切り替える */}
      <g clipPath={`url(#${clipId})`}>
        <motion.rect
          x={-h + 8 - 40}
          y={-h + 8}
          width="40"
          height="14"
          className="fill-white/35"
          initial={{ x: 0 }}
          animate={reduced ? undefined : { x: [0, headerWidth + 40] }}
          transition={{ ...live(0.2, 1.8), ease: "linear", repeatDelay: 1.2 }}
        />
      </g>
      <motion.circle
        cx={h - 16}
        cy={-h + 15}
        r="2.5"
        className="fill-white"
        initial={{ opacity: 1 }}
        animate={reduced ? undefined : { opacity: [1, 0.25, 1] }}
        transition={live(0, 1.6)}
      />
      <rect
        x={-h + 8}
        y={rowTop}
        width="30"
        height={size - 36}
        rx="3"
        className="fill-zinc-200 dark:fill-zinc-700"
      />
      <motion.rect
        x={-h + 44}
        y={rowTop}
        width={size - 50}
        height="12"
        rx="3"
        className="fill-blue-500/20"
        initial={{ y: 0, opacity: 0 }}
        animate={reduced ? undefined : { y: [0, 0, 14, 14, 28, 28, 42, 42], opacity: 1 }}
        transition={{
          y: {
            ...live(0.4, 4.8),
            times: [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 1],
            ease: "easeInOut",
          },
          opacity: { delay: BUILT + 0.4, duration: 0.3 },
        }}
      />
      {rows.map((r) => (
        <rect
          key={r}
          x={-h + 46}
          y={rowTop + 2 + r * 14}
          width={size - 54}
          height="8"
          rx="2"
          className="fill-zinc-200 dark:fill-zinc-700"
        />
      ))}
      {bars.map((b, i) => (
        <motion.g
          key={i}
          style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          variants={{
            hidden: { scaleY: 0 },
            show: {
              scaleY: 1,
              transition: {
                delay: BUILT + 0.1 + i * 0.08,
                duration: 0.6,
                ease: EASE,
              },
            },
          }}
        >
          <motion.rect
            x={-h + 50 + i * 20}
            y={h - 10 - b}
            width="12"
            height={b}
            rx="2"
            className="fill-emerald-500"
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            initial={{ scaleY: 1 }}
            animate={reduced ? undefined : { scaleY: swings[i] }}
            transition={{
              ...live(0.9 + i * 0.12, 2.6 + i * 0.35),
              repeatType: "mirror",
            }}
          />
        </motion.g>
      ))}
    </g>
  );
}

/** DB の側面に、ディスクの区切りを表す線を入れる */
function DbRings({ size, z0, z1 }: { size: number; z0: number; z1: number }) {
  const h = size / 2;
  const mid = (z0 + z1) / 2;
  return (
    <polyline
      points={poly([iso(h, -h, mid), iso(h, h, mid), iso(-h, h, mid)])}
      fill="none"
      className="stroke-white/50"
      strokeWidth="1.5"
    />
  );
}

/** 層と層の間を結ぶ線と、その上を流れるデータの粒 */
function Flow({
  from,
  to,
  offset,
  delay,
  reduced,
}: {
  from: Layer;
  to: Layer;
  offset: number;
  delay: number;
  reduced: boolean;
}) {
  const [x1, y1] = iso(offset, offset, from.z + from.height);
  const [, y2] = iso(offset, offset, to.z);
  return (
    <motion.g
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { delay: BUILT } },
      }}
    >
      <line
        x1={x1}
        x2={x1}
        y1={y1}
        y2={y2}
        className="stroke-foreground/25"
        strokeWidth="1.5"
        strokeDasharray="3 4"
      />
      <motion.circle
        cx={x1}
        r="3.5"
        className="fill-blue-500"
        initial={{ cy: y1, opacity: 0 }}
        animate={reduced ? undefined : { cy: [y1, y2], opacity: [0, 1, 1, 0] }}
        transition={{
          delay: BUILT + delay,
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
      />
    </motion.g>
  );
}

/** 各層の右側に添える名前と技術 */
function Callout({ layer, index }: { layer: Layer; index: number }) {
  const h = layer.size / 2;
  const [x, y] = iso(h, -h, layer.z + layer.height / 2);
  const tx = 392;
  return (
    <motion.g
      className="max-md:hidden"
      variants={{
        hidden: { opacity: 0, x: -8 },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            delay: dropDelay(index) + 0.35,
            duration: 0.5,
            ease: EASE,
          },
        },
      }}
    >
      <line
        x1={x + 6}
        y1={y}
        x2={tx - 8}
        y2={y}
        className="stroke-foreground/20"
        strokeWidth="1"
      />
      <circle cx={x + 6} cy={y} r="2.5" className="fill-foreground/40" />
      <text
        x={tx}
        y={y - 3}
        className="fill-foreground text-[13px] font-semibold"
      >
        {layer.label}
      </text>
      <text x={tx} y={y + 13} className="fill-muted-foreground text-[11px]">
        {layer.tech}
      </text>
    </motion.g>
  );
}

export function SystemStack() {
  const reduced = useReducedMotion() ?? false;
  const entrance = useEntrance();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 120,
    damping: 18,
  });

  return (
    <div>
      <div
        className="[perspective:1000px] max-md:overflow-hidden"
        onPointerMove={(e) => {
          // 傾けるのはマウス操作のときだけ(タッチでは傾けない)
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        <motion.svg
          viewBox="0 0 600 490"
          role="img"
          aria-label="画面・API・データベース・インフラが積み重なった業務システムの構成図"
          className="w-full overflow-visible max-md:w-[160%] max-md:max-w-none"
          style={{ rotateX, rotateY }}
          initial="hidden"
          animate={entrance}
        >
          <ellipse
            cx={OX}
            cy={OY + 112}
            rx="190"
            ry="18"
            className="fill-foreground/5"
          />
          {/* 下の層 → 間の線 → 上の層 の順に描き、線の先は上の層のブロックで隠す */}
          {LAYERS.map((layer, i) => (
            <g key={layer.key}>
              {i > 0 && (
                <>
                  <Flow
                    from={LAYERS[i - 1]}
                    to={layer}
                    offset={-18}
                    delay={(i - 1) * 0.35}
                    reduced={reduced}
                  />
                  <Flow
                    from={LAYERS[i - 1]}
                    to={layer}
                    offset={22}
                    delay={0.6 + (i - 1) * 0.35}
                    reduced={reduced}
                  />
                </>
              )}
              <Block layer={layer} index={i} reduced={reduced} />
            </g>
          ))}
          {LAYERS.map((layer, i) => (
            <Callout key={layer.key} layer={layer} index={i} />
          ))}
        </motion.svg>
      </div>
      {/* スマホでは図中の説明が小さくなりすぎるので、図の下に文字で並べる */}
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-3 md:hidden">
        {[...LAYERS].reverse().map((layer) => (
          <div key={layer.key} className="flex gap-2">
            <span
              aria-hidden
              className={`mt-1.5 size-2.5 shrink-0 rounded-sm ${layer.legend}`}
            />
            <div>
              <dt className="text-sm font-semibold">{layer.label}</dt>
              <dd className="text-xs text-muted-foreground">{layer.tech}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
