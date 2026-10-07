"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const STEPS = ["要件定義", "設計", "実装", "テスト", "運用"];

const EASE = [0.22, 1, 0.36, 1] as const;
/** 名前・説明文が出そろった頃に始める */
const START = 0.5;
const STEP_GAP = 0.32;
const LINE_DURATION = STEP_GAP * (STEPS.length - 1);
const LAST = STEPS.length - 1;

const dot = (i: number): Variants => ({
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: { delay: START + i * STEP_GAP, type: "spring", stiffness: 500, damping: 24 },
  },
});

const check = (i: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { delay: START + i * STEP_GAP + 0.1, duration: 0.3, ease: EASE },
  },
});

const label = (i: number): Variants => ({
  hidden: { opacity: 0.4 },
  show: { opacity: 1, transition: { delay: START + i * STEP_GAP, duration: 0.3 } },
});

/**
 * ヒーローに置く、担当できる工程の図。
 * 開いたときに左から線が伸び、点が順に点灯してチェックが付き、最後の「運用」で輪が 1 回広がる。
 */
export function ProcessLine() {
  const reduced = useReducedMotion();

  return (
    <motion.ol
      aria-label="担当できる工程"
      className="relative mt-2 grid max-w-[520px] grid-cols-5"
      initial={reduced ? false : "hidden"}
      animate="show"
    >
      {/* 点と点を結ぶ線。点の中心(各列の中央)の間に引く */}
      <span aria-hidden className="absolute top-[9px] left-[10%] right-[10%] h-px bg-border" />
      <motion.span
        aria-hidden
        className="absolute top-[9px] left-[10%] right-[10%] h-px origin-left bg-blue-500"
        variants={{
          hidden: { scaleX: 0 },
          show: { scaleX: 1, transition: { delay: START, duration: LINE_DURATION, ease: "linear" } },
        }}
      />
      {STEPS.map((step, i) => (
        <li key={step} className="relative flex flex-col items-center gap-1.5">
          <span className="relative grid size-[19px] place-items-center">
            {i === LAST && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-blue-500"
                variants={{
                  hidden: { scale: 1, opacity: 0 },
                  show: {
                    scale: [1, 2.4],
                    opacity: [0.7, 0],
                    transition: { delay: START + LAST * STEP_GAP + 0.15, duration: 0.9, ease: "easeOut" },
                  },
                }}
              />
            )}
            <span aria-hidden className="absolute inset-0 rounded-full border-2 border-blue-500 bg-background" />
            <motion.span
              aria-hidden
              className="absolute inset-0 grid place-items-center rounded-full bg-blue-500"
              variants={dot(i)}
            >
              <svg viewBox="0 0 12 12" className="size-2.5 text-white" fill="none">
                <motion.path
                  d="M2.5 6.2 l2.2 2.2 l4.6 -4.8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={check(i)}
                />
              </svg>
            </motion.span>
          </span>
          <motion.span className="text-xs font-medium whitespace-nowrap sm:text-[13px]" variants={label(i)}>
            {step}
          </motion.span>
        </li>
      ))}
    </motion.ol>
  );
}
