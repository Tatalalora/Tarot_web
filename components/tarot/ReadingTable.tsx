"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Hand, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { DeckCard } from "@/lib/tarot/shuffle";
import type { PlacedCard, Spread } from "@/lib/tarot/types";
import { CrystalBall } from "./CrystalBall";
import { DeckFan } from "./DeckFan";
import { SpreadBoard } from "./SpreadBoard";

interface ReadingTableProps {
  spread: Spread;
  isFree: boolean;
  deck: DeckCard[];
  placed: PlacedCard[];
  revealed: boolean;
  canReveal: boolean;
  remaining: number;
  onDraw: (deckIndex: number) => void;
  onUndo: () => void;
  onReveal: () => void;
  onOpenCard: (index: number) => void;
  onFinish: () => void;
  onBack: () => void;
}

export function ReadingTable({
  spread,
  isFree,
  deck,
  placed,
  revealed,
  canReveal,
  remaining,
  onDraw,
  onUndo,
  onReveal,
  onOpenCard,
  onFinish,
  onBack,
}: ReadingTableProps) {
  const total = isFree ? null : spread.positions.length;
  const stepText = revealed
    ? "点击任意一张牌查看释义，看完后结束占卜。"
    : canReveal
      ? isFree
        ? "可以继续抽牌（最多 5 张），或者摸一下水晶球翻牌。"
        : "牌阵已经抽满，摸一下水晶球翻牌吧。"
      : isFree
        ? "从下方牌堆里点一张牌，它会飞到桌面上。"
        : `从下方牌堆里点牌，放入第 ${placed.length + 1} 个牌位「${spread.positions[placed.length]?.title ?? ""}」。`;

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 px-4 pb-6 pt-5 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={onBack}
            className="rounded-full cel-sm bg-white hover:bg-lemon"
            aria-label="重新选择牌阵"
          >
            <ArrowLeft />
          </Button>
          <div>
            <h2 className="font-display text-2xl leading-tight text-ink sm:text-3xl">
              {spread.name}
              <span className="ml-2 text-sm text-ink-soft">{spread.nameEn}</span>
            </h2>
            <p className="text-xs text-ink-soft sm:text-sm">{spread.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full cel-sm bg-white px-3 py-1.5 font-display text-sm text-ink">
            {placed.length}
            {total ? ` / ${total}` : " / 5"} 张
          </span>
          {!revealed && placed.length > 0 && (
            <Button variant="outline" onClick={onUndo} className="rounded-full cel-sm bg-white font-display hover:bg-lemon">
              <Undo2 className="size-4" />
              撤回一张
            </Button>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.p
          key={stepText}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-center text-sm text-ink"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
        >
          <Hand className="size-4 shrink-0 text-lavender-deep" />
          {stepText}
        </motion.p>
      </AnimatePresence>

      <div className="grid flex-1 items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <SpreadBoard
            spread={spread}
            placed={placed}
            revealed={revealed}
            isFree={isFree}
            onCardClick={onOpenCard}
            className={cn(
              "mx-auto",
              spread.positions.length >= 7 ? "min-w-[520px] max-w-[780px]" : "max-w-[720px]",
            )}
          />
        </div>

        <div className="flex flex-col items-center gap-4 lg:w-[260px]">
          <CrystalBall ready={canReveal} revealed={revealed} remaining={remaining} onReveal={onReveal} size={160} />
          {revealed && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: placed.length * 0.35 + 0.6 }}>
              <Button
                size="lg"
                onClick={onFinish}
                className="h-12 rounded-full cel bg-mint px-6 font-display text-base text-ink hover:bg-mint-deep active:translate-x-[3px] active:translate-y-[3px] active:shadow-cel-sm"
              >
                <CheckCircle2 className="size-5" />
                结束占卜
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {!revealed && (
        <DeckFan deck={deck} disabled={remaining <= 0} onDraw={onDraw} className="mt-2" />
      )}
    </section>
  );
}
