"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  initialState,
  selectCanReveal,
  selectIsFree,
  selectRemainingSlots,
  selectSpread,
  tarotReducer,
} from "@/lib/tarot/state";
import { CardMeaningDialog } from "./CardMeaningDialog";
import { IntroScreen } from "./IntroScreen";
import { ReadingTable } from "./ReadingTable";
import { SpreadPicker } from "./SpreadPicker";
import { SummaryScreen } from "./SummaryScreen";

const screenVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.98 },
};

export function TarotApp() {
  const [state, dispatch] = React.useReducer(tarotReducer, initialState);
  const spread = selectSpread(state);
  const isFree = selectIsFree(state);
  const canReveal = selectCanReveal(state);
  const remaining = selectRemainingSlots(state);

  const screenKey =
    state.step === "draw" || state.step === "reading" ? `table-${state.session}` : state.step;

  return (
    <main className="flex min-h-dvh flex-1 flex-col">
      <LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screenKey}
            className="flex flex-1 flex-col"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {state.step === "intro" && <IntroScreen onStart={() => dispatch({ type: "START" })} />}

            {state.step === "spread" && (
              <SpreadPicker
                allowReversed={state.allowReversed}
                onToggleReversed={(v) => dispatch({ type: "SET_REVERSED", allowReversed: v })}
                onPick={(spreadId) => dispatch({ type: "PICK_SPREAD", spreadId })}
                onBack={() => dispatch({ type: "HOME" })}
              />
            )}

            {(state.step === "draw" || state.step === "reading") && spread && (
              <ReadingTable
                spread={spread}
                isFree={isFree}
                deck={state.deck}
                placed={state.placed}
                revealed={state.step === "reading"}
                canReveal={canReveal}
                remaining={remaining}
                onDraw={(deckIndex) => dispatch({ type: "DRAW_CARD", deckIndex })}
                onUndo={() => dispatch({ type: "UNDO_DRAW" })}
                onReveal={() => dispatch({ type: "REVEAL" })}
                onOpenCard={(index) => dispatch({ type: "OPEN_CARD", index })}
                onFinish={() => dispatch({ type: "FINISH" })}
                onBack={() => dispatch({ type: "RESTART" })}
              />
            )}

            {state.step === "summary" && (
              <SummaryScreen
                spread={spread}
                placed={state.placed}
                isFree={isFree}
                onOpenCard={(index) => dispatch({ type: "OPEN_CARD", index })}
                onRestart={() => dispatch({ type: "RESTART" })}
                onHome={() => dispatch({ type: "HOME" })}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      <CardMeaningDialog
        spread={spread}
        placed={state.placed}
        activeIndex={state.activeCard}
        isFree={isFree}
        onChange={(index) => dispatch({ type: "OPEN_CARD", index })}
      />

      <footer className="relative z-0 px-4 pb-4 pt-6 text-center text-[11px] text-ink-soft/80">
        牌面来自 1909 年 Rider–Waite–Smith 公有领域扫描 · 仅供娱乐与自我觉察
      </footer>
    </main>
  );
}
