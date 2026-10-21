"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TarotCardData } from "@/lib/tarot/types";

interface TarotCardProps {
  card?: TarotCardData | null;
  reversed?: boolean;
  faceUp?: boolean;
  /** Seconds to wait before flipping, used to stagger reveals */
  flipDelay?: number;
  layoutId?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** Show the Chinese name ribbon on the face */
  showName?: boolean;
  /** Hover tilt + lift; off for cards sitting in the fan */
  interactive?: boolean;
  ariaLabel?: string;
  priority?: boolean;
}

export function TarotCard({
  card,
  reversed = false,
  faceUp = false,
  flipDelay = 0,
  layoutId,
  onClick,
  className,
  style,
  showName = true,
  interactive = true,
  ariaLabel,
  priority,
}: TarotCardProps) {
  const [imgFailed, setImgFailed] = React.useState(false);
  const clickable = typeof onClick === "function";

  return (
    <motion.div
      layoutId={layoutId}
      layout={layoutId ? true : undefined}
      transition={{ layout: { type: "spring", stiffness: 260, damping: 26 } }}
      className={cn("perspective-1200 aspect-[300/516] select-none", className)}
      style={style}
    >
      <motion.div
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={ariaLabel ?? (faceUp && card ? `${card.name}${reversed ? "（逆位）" : ""}` : "塔罗牌背面")}
        onClick={onClick}
        onKeyDown={(e) => {
          if (!clickable) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={cn(
          "relative h-full w-full preserve-3d rounded-[8%] outline-none",
          clickable && "cursor-pointer focus-visible:ring-4 focus-visible:ring-lemon-deep",
        )}
        initial={false}
        animate={{ rotateY: faceUp ? 180 : 0 }}
        transition={{ duration: 0.9, delay: faceUp ? flipDelay : 0, ease: [0.34, 1.3, 0.64, 1] }}
        whileHover={interactive ? { y: -8, rotateX: 6, scale: 1.03 } : undefined}
        whileTap={interactive ? { scale: 0.97 } : undefined}
      >
        {/* Back */}
        <div className="absolute inset-0 backface-hidden overflow-hidden rounded-[8%] cel-flat bg-lavender shadow-[4px_5px_0_var(--color-ink)]">
          <Image
            src="/card-back.svg"
            alt=""
            fill
            sizes="(max-width: 640px) 25vw, 160px"
            className="object-cover"
            draggable={false}
            unoptimized
          />
        </div>

        {/* Face */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden rounded-[8%] cel-flat bg-cream shadow-[4px_5px_0_var(--color-ink)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {card && (
            <div
              className={cn("absolute inset-0 transition-transform", reversed && "rotate-180")}
            >
              {!imgFailed ? (
                <Image
                  src={card.image}
                  alt={`${card.name} ${card.nameEn}`}
                  fill
                  sizes="(max-width: 640px) 30vw, 220px"
                  className="object-cover"
                  draggable={false}
                  unoptimized
                  priority={priority}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <FallbackFace card={card} />
              )}
            </div>
          )}
          {card && showName && (
            <div
              className={cn(
                "absolute inset-x-[6%] bottom-[5%] rounded-full cel-sm bg-cream/95 px-1 py-[2%] text-center font-display text-[0.62em] leading-tight text-ink",
                reversed && "bg-sakura/95",
              )}
            >
              {card.name}
              {reversed && <span className="ml-1 text-[0.8em] text-ink-soft">逆</span>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FallbackFace({ card }: { card: TarotCardData }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(135deg,var(--color-lemon)_0_12px,var(--color-cream)_12px_24px)] p-3 text-center">
      <div className="rounded-full cel-sm bg-white px-3 py-1 font-display text-sm text-ink">
        {card.name}
      </div>
      <p className="text-[0.6em] text-ink-soft">{card.nameEn}</p>
      <p className="text-[0.55em] text-ink-soft">图片加载失败</p>
    </div>
  );
}
