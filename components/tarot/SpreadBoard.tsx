"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { PlacedCard, Spread } from "@/lib/tarot/types";
import { TarotCard } from "./TarotCard";

const ACCENT_BG: Record<Spread["accent"], string> = {
  mint: "bg-mint",
  lavender: "bg-lavender",
  sakura: "bg-sakura",
  lemon: "bg-lemon",
  peach: "bg-peach",
  sky: "bg-sky",
};

interface SpreadBoardProps {
  spread: Spread;
  placed: PlacedCard[];
  revealed: boolean;
  isFree?: boolean;
  onCardClick?: (index: number) => void;
  className?: string;
}

export function SpreadBoard({ spread, placed, revealed, isFree, onCardClick, className }: SpreadBoardProps) {
  const nextIndex = placed.length;
  const showLabels = !isFree && spread.positions.length <= 7;

  return (
    <div className={cn("w-full perspective-1200", className)}>
      <motion.div
        className={cn(
          "relative mx-auto w-full rounded-[28px] cel-lg bg-white/70 backdrop-blur-sm",
          "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.85),rgba(255,255,255,0.35))]",
        )}
        style={{ aspectRatio: spread.aspect, transformOrigin: "50% 100%" }}
        initial={{ rotateX: 14, opacity: 0, y: 30 }}
        animate={{ rotateX: 6, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        {/* Tablecloth pattern */}
        <div
          className={cn(
            "pointer-events-none absolute inset-[10px] rounded-[20px] opacity-60",
            ACCENT_BG[spread.accent],
          )}
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="pointer-events-none absolute inset-[10px] rounded-[20px] border-2 border-dashed border-white/80" />

        {/* Slots */}
        {spread.positions.map((pos, i) => {
          const isNext = i === nextIndex && !revealed;
          const filled = i < placed.length;
          return (
            <div
              key={pos.id}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${spread.cardWidth}%`,
                zIndex: pos.rotate ? 5 : 1,
                transform: `translate(-50%, -50%) rotate(${pos.rotate ?? 0}deg)`,
              }}
            >
              {!filled && (
                <motion.div
                  className={cn(
                    "aspect-[300/516] w-full rounded-[8%] border-[3px] border-dashed border-ink/50 bg-white/40 flex flex-col items-center justify-center gap-[6%] text-center",
                    isNext && "border-ink bg-lemon/70",
                  )}
                  animate={isNext ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={{ duration: 1.4, repeat: isNext ? Infinity : 0 }}
                >
                  <span className="flex size-[32%] items-center justify-center rounded-full cel-sm bg-white font-display text-[0.9em] text-ink">
                    {i + 1}
                  </span>
                  {!isFree && (
                    <span className="px-1 font-display text-[0.62em] leading-tight text-ink/80">
                      {pos.title}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Placed cards (rendered after slots so they sit on top) */}
        {placed.map((p) => {
          const pos = spread.positions[p.positionIndex];
          if (!pos) return null;
          return (
            <div
              key={p.layoutId}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${spread.cardWidth}%`,
                zIndex: pos.rotate ? 6 : 2,
                transform: `translate(-50%, -50%) rotate(${pos.rotate ?? 0}deg)`,
              }}
            >
              <TarotCard
                layoutId={p.layoutId}
                card={p.card}
                reversed={p.reversed}
                faceUp={revealed}
                flipDelay={p.positionIndex * 0.35}
                onClick={revealed && onCardClick ? () => onCardClick(p.positionIndex) : undefined}
                interactive={revealed}
                className="w-full text-[clamp(8px,1.1vw,16px)]"
                priority
              />
              {revealed && (
                <motion.span
                  className="pointer-events-none absolute left-[5%] top-[3%] z-10 flex size-[26%] max-h-7 max-w-7 items-center justify-center rounded-full cel-sm bg-lemon font-display text-[clamp(9px,0.9vw,13px)] text-ink"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: p.positionIndex * 0.35 + 0.6, type: "spring" }}
                >
                  {p.positionIndex + 1}
                </motion.span>
              )}
              {showLabels && revealed && !pos.rotate && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-full mt-1 whitespace-nowrap rounded-full cel-sm bg-white px-2 py-0.5 font-display text-[clamp(9px,0.9vw,13px)] text-ink"
                  initial={{ opacity: 0, y: -6, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, x: "-50%" }}
                  transition={{ delay: p.positionIndex * 0.35 + 0.8 }}
                >
                  {pos.title}
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
