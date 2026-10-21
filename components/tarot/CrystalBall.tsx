"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CrystalBallProps {
  /** Ball is "charged" and can be touched to reveal */
  ready: boolean;
  /** Reveal already happened */
  revealed: boolean;
  remaining: number;
  onReveal: () => void;
  className?: string;
  size?: number;
}

export function CrystalBall({ ready, revealed, remaining, onReveal, className, size = 180 }: CrystalBallProps) {
  const [burst, setBurst] = React.useState(0);
  const disabled = !ready || revealed;

  const handle = () => {
    if (disabled) return;
    setBurst((b) => b + 1);
    onReveal();
  };

  const hint = revealed
    ? "牌已翻开，点击卡牌查看释义"
    : ready
      ? "摸一下水晶球，翻开命运"
      : remaining > 0
        ? `还差 ${remaining} 张牌，先把牌阵抽满`
        : "先抽一张牌";

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            aria-label={hint}
            aria-disabled={disabled}
            onClick={handle}
            className={cn(
              "group relative outline-none focus-visible:ring-4 focus-visible:ring-lemon-deep rounded-full",
              disabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
            style={{ width: size, height: size * 1.22 }}
            whileHover={disabled ? undefined : { scale: 1.04, y: -4 }}
            whileTap={disabled ? undefined : { scale: 0.95 }}
          >
            {/* Stand */}
            <div
              className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-[40%_40%_30%_30%] cel bg-peach"
              style={{ width: size * 0.68, height: size * 0.3 }}
            >
              <div
                className="absolute left-[18%] top-[18%] h-[14%] w-[26%] rounded-full bg-white/80"
                style={{ transform: "rotate(-10deg)" }}
              />
              <div className="absolute inset-x-[12%] bottom-[14%] h-[3px] rounded-full bg-ink/25" />
            </div>
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full cel-flat bg-peach-deep"
              style={{ width: size * 0.52, height: size * 0.14, bottom: size * 0.24 }}
            />

            {/* Sphere */}
            <motion.div
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 rounded-full cel preserve-3d",
                ready && !revealed ? "animate-glow" : "",
              )}
              style={{
                width: size,
                height: size,
                background: revealed
                  ? "radial-gradient(circle at 35% 30%, #fff8f3 0 18%, #ffd1dc 18.5% 52%, #d8c8f0 52.5% 100%)"
                  : ready
                    ? "radial-gradient(circle at 35% 30%, #fff8f3 0 18%, #fff3b0 18.5% 48%, #ffd8b8 48.5% 100%)"
                    : "radial-gradient(circle at 35% 30%, #ffffff 0 18%, #d8c8f0 18.5% 55%, #a98bd9 55.5% 100%)",
              }}
              animate={ready && !revealed ? { y: [0, -6, 0] } : { y: 0 }}
              transition={{ duration: 1.6, repeat: ready && !revealed ? Infinity : 0, ease: "easeInOut" }}
            >
              {/* Flat specular highlights */}
              <div
                className="absolute left-[16%] top-[12%] h-[12%] w-[34%] rounded-full bg-white"
                style={{ transform: "rotate(-24deg)" }}
              />
              <div className="absolute left-[14%] top-[30%] h-[6%] w-[6%] rounded-full bg-white" />
              {/* Inner mist */}
              <div className="absolute left-[22%] top-[42%] h-[40%] w-[56%] rounded-[60%_40%_55%_45%] bg-white/35" />

              {/* Floating stars inside the ball */}
              <Sparkles
                className={cn(
                  "absolute left-[40%] top-[40%] size-[22%] text-ink/70 transition-opacity",
                  ready && !revealed ? "opacity-100 animate-twinkle" : "opacity-40",
                )}
                strokeWidth={2.5}
              />
              <span
                className={cn(
                  "absolute left-[64%] top-[26%] size-[8%] rounded-full bg-lemon-deep cel-sm transition-opacity",
                  ready && !revealed ? "opacity-100 animate-twinkle [animation-delay:0.6s]" : "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-[26%] top-[62%] size-[7%] rounded-full bg-sakura-deep cel-sm transition-opacity",
                  ready && !revealed ? "opacity-100 animate-twinkle [animation-delay:1.1s]" : "opacity-0",
                )}
              />

              {/* Touch burst */}
              <AnimatePresence>
                {burst > 0 && (
                  <motion.span
                    key={burst}
                    className="pointer-events-none absolute inset-0 rounded-full border-4 border-lemon-deep"
                    initial={{ scale: 0.6, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pulse ring under the ball when ready */}
            {ready && !revealed && (
              <motion.span
                className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full border-[3px] border-lemon-deep/70"
                style={{ width: size, height: size }}
                animate={{ scale: [1, 1.22], opacity: [0.8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="top" className="font-display text-sm">
          {hint}
        </TooltipContent>
      </Tooltip>

      <p
        className={cn(
          "max-w-[220px] text-center font-display text-sm leading-snug",
          ready && !revealed ? "text-ink animate-wiggle" : "text-ink-soft",
        )}
        aria-live="polite"
      >
        {hint}
      </p>
    </div>
  );
}
