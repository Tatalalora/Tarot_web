"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SPREADS } from "@/lib/tarot/spreads";
import type { Spread } from "@/lib/tarot/types";

interface SpreadPickerProps {
  allowReversed: boolean;
  onToggleReversed: (v: boolean) => void;
  onPick: (spreadId: string | "free") => void;
  onBack: () => void;
}

const ACCENT: Record<Spread["accent"], { bg: string; chip: string }> = {
  mint: { bg: "bg-mint", chip: "bg-mint-deep" },
  lavender: { bg: "bg-lavender", chip: "bg-lavender-deep" },
  sakura: { bg: "bg-sakura", chip: "bg-sakura-deep" },
  lemon: { bg: "bg-lemon", chip: "bg-lemon-deep" },
  peach: { bg: "bg-peach", chip: "bg-peach-deep" },
  sky: { bg: "bg-sky", chip: "bg-sky-deep" },
};

export function SpreadPicker({ allowReversed, onToggleReversed, onPick, onBack }: SpreadPickerProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-5 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-lg" onClick={onBack} className="rounded-full cel-sm bg-white hover:bg-lemon" aria-label="返回首页">
            <ArrowLeft />
          </Button>
          <div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">选择牌阵</h2>
            <p className="text-sm text-ink-soft">心里想着你的问题，挑一个最贴近它的牌阵。</p>
          </div>
        </div>
        <label className="flex items-center gap-3 rounded-full cel-sm bg-white px-4 py-2 font-display text-sm text-ink">
          <span>允许逆位</span>
          <Switch checked={allowReversed} onCheckedChange={onToggleReversed} aria-label="允许逆位" />
        </label>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SPREADS.map((spread, i) => {
          const accent = ACCENT[spread.accent];
          return (
            <motion.button
              key={spread.id}
              type="button"
              onClick={() => onPick(spread.id)}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[26px] cel text-left outline-none transition-transform",
                "hover:-translate-y-1 hover:shadow-cel-lg focus-visible:ring-4 focus-visible:ring-lemon-deep active:translate-x-[3px] active:translate-y-[3px] active:shadow-cel-sm",
                accent.bg,
              )}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 160, damping: 18 }}
            >
              <div className="relative h-[150px] w-full overflow-hidden">
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.95) 1.5px, transparent 2px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <MiniSpread spread={spread} />
                <span className={cn("absolute right-3 top-3 rounded-full cel-sm px-2.5 py-0.5 font-display text-xs text-white", accent.chip)}>
                  {spread.positions.length} 张牌
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1.5 border-t-[3px] border-ink bg-white p-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display text-2xl text-ink">{spread.name}</h3>
                  <span className="text-xs text-ink-soft">{spread.nameEn}</span>
                </div>
                <p className="font-display text-sm text-ink-soft">{spread.tagline}</p>
                <p className="text-sm leading-relaxed text-ink/80">{spread.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-2 pt-2 text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onPick("free")}
          className="h-12 rounded-full cel-sm bg-white px-6 font-display text-base hover:bg-lavender"
        >
          <Shuffle className="size-4" />
          跳过，直接抽牌
        </Button>
        <p className="text-xs text-ink-soft">不设牌位含义，自由抽 1 至 5 张，凭直觉解读。</p>
      </div>
    </section>
  );
}

function MiniSpread({ spread }: { spread: Spread }) {
  const w = 20;
  return (
    <div className="absolute inset-4">
      <div className="relative mx-auto h-full" style={{ aspectRatio: spread.aspect, maxWidth: "100%" }}>
        {spread.positions.map((pos, i) => (
          <div
            key={pos.id}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${Math.min(w, spread.cardWidth * 1.15)}%`,
              transform: `translate(-50%, -50%) rotate(${pos.rotate ?? 0}deg)`,
              zIndex: pos.rotate ? 2 : 1,
            }}
          >
            <motion.div
              className="flex aspect-[300/516] w-full items-center justify-center rounded-[3px] border-2 border-ink bg-white font-display text-[10px] text-ink shadow-[2px_2px_0_var(--color-ink)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 240, damping: 16 }}
            >
              {i + 1}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
