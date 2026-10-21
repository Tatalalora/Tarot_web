"use client";

import { motion } from "framer-motion";
import { Home, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TarotCard } from "./TarotCard";
import type { PlacedCard, Spread, Suit } from "@/lib/tarot/types";

interface SummaryScreenProps {
  spread: Spread | null;
  placed: PlacedCard[];
  isFree: boolean;
  onOpenCard: (index: number) => void;
  onRestart: () => void;
  onHome: () => void;
}

const SUIT_THEME: Record<Suit, string> = {
  wands: "行动与热情",
  cups: "情感与关系",
  swords: "思考与抉择",
  pentacles: "现实与资源",
};

function conclude(placed: PlacedCard[]): string {
  if (placed.length === 0) return "这次没有抽到牌。";
  const majors = placed.filter((p) => p.card.arcana === "major").length;
  const reversed = placed.filter((p) => p.reversed).length;
  const suitCount: Partial<Record<Suit, number>> = {};
  placed.forEach((p) => {
    if (p.card.suit) suitCount[p.card.suit] = (suitCount[p.card.suit] ?? 0) + 1;
  });
  const dominant = (Object.entries(suitCount) as [Suit, number][]).sort((a, b) => b[1] - a[1])[0];

  const parts: string[] = [];
  if (placed.length === 1) {
    const p = placed[0];
    parts.push(`今天的指引是「${p.card.name}」${p.reversed ? "逆位" : "正位"}，关键词：${p.card.keywords.slice(0, 3).join("、")}。`);
    return parts.join("");
  }
  if (majors >= Math.ceil(placed.length / 2)) {
    parts.push("大阿卡纳占了多数，说明这件事牵动着人生层面的重要课题，不是日常小事。");
  } else if (majors === 0) {
    parts.push("全部是小阿卡纳，这件事更多取决于你日常的选择与行动，主动权在你手里。");
  } else {
    parts.push("大小阿卡纳交织，命运的推力与你自己的选择同样重要。");
  }
  if (dominant && dominant[1] >= 2) {
    parts.push(`${SUIT_THEME[dominant[0]]}是这次占卜的主旋律。`);
  }
  if (reversed === 0) {
    parts.push("没有逆位牌，能量流动顺畅，放心往前走。");
  } else if (reversed >= Math.ceil(placed.length / 2)) {
    parts.push("逆位较多，提醒你放慢脚步，先向内整理，再向外行动。");
  } else {
    parts.push("少量逆位牌点出了需要留意的小阻碍，看清它就不足为惧。");
  }
  return parts.join("");
}

export function SummaryScreen({ spread, placed, isFree, onOpenCard, onRestart, onHome }: SummaryScreenProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-5 py-8">
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full cel-sm bg-white px-4 py-1.5 font-display text-sm text-ink">
          <Sparkles className="size-4 text-lavender-deep" />
          占卜结束 · {spread?.name ?? "自由抽牌"}
        </span>
        <h2 className="mt-3 font-display text-4xl text-white cel-text sm:text-5xl">这次的牌语</h2>
      </motion.header>

      <motion.div
        className="rounded-[26px] cel bg-lemon p-5 text-[15px] leading-relaxed text-ink sm:p-6 sm:text-base"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <p className="mb-1 font-display text-sm text-ink-soft">一句话总结</p>
        <p>{conclude(placed)}</p>
      </motion.div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placed.map((p, i) => {
          const pos = spread?.positions[p.positionIndex];
          return (
            <motion.li
              key={p.layoutId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <button
                type="button"
                onClick={() => onOpenCard(i)}
                className={cn(
                  "flex w-full items-stretch gap-4 rounded-[22px] cel bg-white p-3 text-left outline-none transition-transform",
                  "hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-lemon-deep active:translate-x-[2px] active:translate-y-[2px] active:shadow-cel-sm",
                )}
              >
                <div className="w-[72px] shrink-0 text-[7px]">
                  <TarotCard card={p.card} reversed={p.reversed} faceUp interactive={false} showName={false} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  {pos && !isFree && (
                    <span className="w-fit rounded-full bg-lavender px-2 py-0.5 font-display text-[11px] text-ink">
                      {i + 1} · {pos.title}
                    </span>
                  )}
                  <h3 className="truncate font-display text-xl text-ink">
                    {p.card.name}
                    <span className={cn("ml-1.5 text-xs", p.reversed ? "text-sakura-deep" : "text-mint-deep")}>
                      {p.reversed ? "逆位" : "正位"}
                    </span>
                  </h3>
                  <p className="text-xs text-ink-soft">{p.card.keywords.join(" · ")}</p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-ink/80">
                    {p.reversed ? p.card.reversed : p.card.upright}
                  </p>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          size="lg"
          onClick={onRestart}
          className="h-12 rounded-full cel bg-sakura px-6 font-display text-base text-ink hover:bg-sakura-deep hover:text-white active:translate-x-[3px] active:translate-y-[3px] active:shadow-cel-sm"
        >
          <RotateCcw className="size-4" />
          再占一次
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={onHome}
          className="h-12 rounded-full cel-sm bg-white px-6 font-display text-base hover:bg-lemon"
        >
          <Home className="size-4" />
          回到首页
        </Button>
      </div>
    </section>
  );
}
