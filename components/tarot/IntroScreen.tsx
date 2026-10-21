"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Moon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrystalBall } from "./CrystalBall";
import { TarotCard } from "./TarotCard";
import { TAROT_CARDS } from "@/lib/tarot/cards";

interface IntroScreenProps {
  onStart: () => void;
}

const HERO_CARDS = [TAROT_CARDS[17], TAROT_CARDS[19], TAROT_CARDS[18]]; // 星星 · 太阳 · 月亮

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 px-5 py-12 lg:flex-row lg:gap-16">
      <FloatingDecor />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
        <motion.span
          className="mb-4 inline-flex items-center gap-2 rounded-full cel-sm bg-white px-4 py-1.5 font-display text-sm text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="size-4 text-lavender-deep" />
          韦特塔罗 · 78 张全牌 · 正逆位
        </motion.span>

        <motion.h1
          className="font-display text-5xl leading-[1.1] text-white cel-text sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          马卡龙
          <br />
          <span className="text-lemon">塔罗占卜屋</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          选一个牌阵，从牌堆里抽出属于你的牌，再轻轻摸一下水晶球——命运的答案就会翻开。甜甜的、软软的，但很认真。
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            size="lg"
            onClick={onStart}
            className="h-14 rounded-full cel bg-sakura px-8 font-display text-xl text-ink hover:bg-sakura-deep hover:text-white active:translate-x-[3px] active:translate-y-[3px] active:shadow-cel-sm"
          >
            <Sparkles className="size-5" />
            开始占卜
          </Button>
          <ul className="flex items-center gap-2 text-sm text-ink-soft">
            <li className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
              <Star className="size-3.5 text-lemon-deep" /> 6 种牌阵
            </li>
            <li className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
              <Moon className="size-3.5 text-lavender-deep" /> 3D 翻牌
            </li>
            <li className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1">
              <Heart className="size-3.5 text-sakura-deep" /> 中文释义
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex items-end gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 120 }}
      >
        <div className="relative perspective-1200 hidden sm:block">
          {HERO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              className="absolute bottom-0 left-1/2 w-[120px] origin-bottom text-[11px] lg:w-[140px]"
              style={{ marginLeft: -60 }}
              initial={{ rotate: 0, x: 0 }}
              animate={{ rotate: (i - 1) * 16, x: (i - 1) * 46, y: Math.abs(i - 1) * 10 }}
              transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 140 }}
            >
              <TarotCard card={card} faceUp flipDelay={0.6 + i * 0.2} interactive showName />
            </motion.div>
          ))}
          <div className="w-[260px] lg:w-[300px]" style={{ height: 240 }} />
        </div>
        <div className="animate-float-slow">
          <CrystalBall ready={false} revealed={false} remaining={0} onReveal={() => {}} size={170} className="[&>p]:hidden" />
        </div>
      </motion.div>
    </section>
  );
}

function FloatingDecor() {
  const items = [
    { cls: "left-[6%] top-[14%] size-5 text-lemon-deep", delay: "0s" },
    { cls: "left-[20%] top-[72%] size-4 text-sakura-deep", delay: "0.7s" },
    { cls: "left-[48%] top-[8%] size-6 text-lavender-deep", delay: "1.3s" },
    { cls: "left-[86%] top-[20%] size-4 text-mint-deep", delay: "0.4s" },
    { cls: "left-[72%] top-[84%] size-5 text-sky-deep", delay: "1.8s" },
    { cls: "left-[92%] top-[62%] size-3 text-lemon-deep", delay: "1.1s" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {items.map((it, i) => (
        <Star
          key={i}
          className={`absolute animate-twinkle fill-current ${it.cls}`}
          style={{ animationDelay: it.delay }}
          strokeWidth={2.5}
        />
      ))}
    </div>
  );
}
