"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DeckCard } from "@/lib/tarot/shuffle";
import { TarotCard } from "./TarotCard";

interface DeckFanProps {
  deck: DeckCard[];
  disabled?: boolean;
  onDraw: (deckIndex: number) => void;
  className?: string;
}

const VISIBLE_DESKTOP = 21;
const VISIBLE_MOBILE = 11;

export function DeckFan({ deck, disabled, onDraw, className }: DeckFanProps) {
  const [visible, setVisible] = React.useState(VISIBLE_DESKTOP);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setVisible(mq.matches ? VISIBLE_MOBILE : VISIBLE_DESKTOP);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const shown = deck.slice(0, Math.min(visible, deck.length));
  const n = shown.length;
  const spreadDeg = n > 1 ? Math.min(60, n * 2.7) : 0;
  const stepDeg = n > 1 ? spreadDeg / (n - 1) : 0;

  if (deck.length === 0) {
    return (
      <div className={cn("flex items-center justify-center py-6", className)}>
        <p className="rounded-full cel-sm bg-white px-4 py-2 font-display text-sm text-ink-soft">
          牌堆已经空了
        </p>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto h-[170px] w-full max-w-[720px] overflow-visible sm:h-[215px]">
        {shown.map((dc, i) => {
          const angle = -spreadDeg / 2 + i * stepDeg;
          const rad = (angle * Math.PI) / 180;
          const radius = 520;
          // Arc placement: cards sit on a circle whose center is far below the container.
          const x = Math.sin(rad) * radius;
          const y = (1 - Math.cos(rad)) * radius;
          return (
            <motion.div
              key={dc.layoutId}
              className="absolute left-1/2 top-3 -ml-[32px] w-[64px] origin-bottom sm:-ml-[42px] sm:w-[84px]"
              style={{ zIndex: i }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, x, y, rotate: angle }}
              transition={{ type: "spring", stiffness: 180, damping: 20, delay: Math.min(i * 0.02, 0.4) }}
              whileHover={disabled ? undefined : { y: y - 28, scale: 1.08, zIndex: 50 }}
            >
              <TarotCard
                layoutId={dc.layoutId}
                card={dc.card}
                reversed={dc.reversed}
                faceUp={false}
                interactive={false}
                onClick={disabled ? undefined : () => onDraw(i)}
                ariaLabel={disabled ? "牌阵已满" : `抽第 ${i + 1} 张牌`}
                className={cn("w-full", disabled && "opacity-70")}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-[60] flex justify-center">
        <span className="rounded-full cel-sm bg-white px-3 py-1 font-display text-xs text-ink-soft">
          牌堆剩余 {deck.length} 张
        </span>
      </div>
    </div>
  );
}
