"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SUIT_LABELS } from "@/lib/tarot/cards";
import type { PlacedCard, Spread } from "@/lib/tarot/types";

interface CardMeaningDialogProps {
  spread: Spread | null;
  placed: PlacedCard[];
  activeIndex: number | null;
  isFree: boolean;
  onChange: (index: number | null) => void;
}

export function CardMeaningDialog({ spread, placed, activeIndex, isFree, onChange }: CardMeaningDialogProps) {
  const open = activeIndex !== null && !!placed[activeIndex];
  const item = open ? placed[activeIndex!] : null;
  const pos = item && spread ? spread.positions[item.positionIndex] : null;
  const canPrev = activeIndex !== null && activeIndex > 0;
  const canNext = activeIndex !== null && activeIndex < placed.length - 1;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onChange(null)}>
      <DialogContent
        className="cel-lg max-h-[92vh] w-[min(96vw,760px)] max-w-none overflow-y-auto rounded-[28px] bg-cream p-0 sm:max-w-none"
        showCloseButton
      >
        {item && (
          <div className="grid gap-0 sm:grid-cols-[240px_1fr]">
            {/* Card image */}
            <div
              className={cn(
                "flex items-center justify-center p-6 sm:rounded-l-[24px]",
                item.reversed ? "bg-sakura" : "bg-lavender",
              )}
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1.5px, transparent 2px)",
                backgroundSize: "18px 18px",
              }}
            >
              <div
                className={cn(
                  "relative aspect-[300/516] w-[160px] overflow-hidden rounded-[12px] cel bg-white sm:w-[190px]",
                  item.reversed && "rotate-180",
                )}
              >
                <Image
                  src={item.card.image}
                  alt={`${item.card.name} ${item.card.nameEn}`}
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4 p-6">
              <DialogHeader className="gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {pos && !isFree && (
                    <Badge className="h-auto rounded-full cel-sm bg-lemon px-3 py-1 font-display text-sm text-ink hover:bg-lemon">
                      {item.positionIndex + 1} · {pos.title}
                    </Badge>
                  )}
                  <Badge
                    className={cn(
                      "h-auto rounded-full cel-sm px-3 py-1 font-display text-sm text-ink",
                      item.reversed ? "bg-sakura hover:bg-sakura" : "bg-mint hover:bg-mint",
                    )}
                  >
                    {item.reversed ? "逆位" : "正位"}
                  </Badge>
                  <Badge variant="outline" className="h-auto rounded-full border-ink/40 px-3 py-1 font-display text-sm text-ink-soft">
                    {item.card.arcana === "major" ? "大阿卡纳" : item.card.suit ? SUIT_LABELS[item.card.suit] : ""}
                  </Badge>
                </div>
                <DialogTitle className="font-display text-3xl text-ink">
                  {item.card.name}
                  <span className="ml-2 align-middle text-base text-ink-soft">{item.card.nameEn}</span>
                </DialogTitle>
                <DialogDescription className="text-ink-soft">
                  {pos && !isFree && pos.meaning ? `牌位含义：${pos.meaning}` : "凭直觉感受这张牌与你问题之间的联系。"}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-1.5">
                {item.card.keywords.map((k) => (
                  <span key={k} className="rounded-full border-2 border-ink/70 bg-white px-2.5 py-0.5 text-xs text-ink">
                    {k}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl cel-sm bg-white p-4 text-[15px] leading-relaxed text-ink">
                <p className="mb-1 font-display text-sm text-ink-soft">
                  {item.reversed ? "逆位解读" : "正位解读"}
                </p>
                <p>{item.reversed ? item.card.reversed : item.card.upright}</p>
              </div>

              <details className="group rounded-2xl border-2 border-dashed border-ink/40 bg-white/60 p-3 text-sm text-ink-soft">
                <summary className="cursor-pointer select-none font-display text-ink">
                  也看看{item.reversed ? "正位" : "逆位"}的含义
                </summary>
                <p className="mt-2 leading-relaxed">{item.reversed ? item.card.upright : item.card.reversed}</p>
              </details>

              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <Button
                  variant="outline"
                  className="rounded-full cel-sm bg-white font-display hover:bg-lemon"
                  disabled={!canPrev}
                  onClick={() => canPrev && onChange(activeIndex! - 1)}
                >
                  <ChevronLeft /> 上一张
                </Button>
                <span className="font-display text-sm text-ink-soft">
                  {item.positionIndex + 1} / {placed.length}
                </span>
                <Button
                  variant="outline"
                  className="rounded-full cel-sm bg-white font-display hover:bg-lemon"
                  disabled={!canNext}
                  onClick={() => canNext && onChange(activeIndex! + 1)}
                >
                  下一张 <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
