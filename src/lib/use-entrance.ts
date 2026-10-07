"use client";

import { useAnimationControls, useReducedMotion } from "motion/react";
import { useEffect } from "react";

/**
 * 登場アニメーション(variants の "hidden" → "show")を制御する。
 *
 * サーバーは「動きを減らす設定」を知らないので、最初の描画はサーバーもブラウザも "hidden" にそろえる
 * (ここで分岐すると、静的書き出しの HTML とブラウザの初回描画が食い違う)。
 * 表示後に、動きを減らす設定なら一瞬で "show" にし、そうでなければ play になった時点で動かす。
 *
 * @param play 動かし始める条件(画面に入ったか、など)
 * @param replayKey 値が変わるたびに最初から動かし直す(カーソルを乗せたときの再生など)
 */
export function useEntrance(play = true, replayKey = 0) {
  const controls = useAnimationControls();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      controls.set("show");
    } else if (play) {
      controls.start("show");
    }
  }, [controls, reduced, play, replayKey]);

  return controls;
}
