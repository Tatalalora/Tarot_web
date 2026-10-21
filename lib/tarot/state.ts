import { shuffleDeck, type DeckCard } from "./shuffle";
import { buildFreeSpread, FREE_SPREAD_MAX, getSpread } from "./spreads";
import type { PlacedCard, Spread } from "./types";

export type Step = "intro" | "spread" | "draw" | "reading" | "summary";

export interface TarotState {
  step: Step;
  /** `null` while on intro/spread screens; `"free"` for skip-mode */
  spreadId: string | null;
  deck: DeckCard[];
  placed: PlacedCard[];
  allowReversed: boolean;
  /** Index into `placed` of the card whose meaning dialog is open */
  activeCard: number | null;
  /** Incremented on every new reading so screens can remount cleanly */
  session: number;
}

export type TarotAction =
  | { type: "START" }
  | { type: "PICK_SPREAD"; spreadId: string | "free" }
  | { type: "DRAW_CARD"; deckIndex: number }
  | { type: "UNDO_DRAW" }
  | { type: "REVEAL" }
  | { type: "OPEN_CARD"; index: number | null }
  | { type: "FINISH" }
  | { type: "RESTART" }
  | { type: "HOME" }
  | { type: "SET_REVERSED"; allowReversed: boolean };

export const initialState: TarotState = {
  step: "intro",
  spreadId: null,
  deck: [],
  placed: [],
  allowReversed: true,
  activeCard: null,
  session: 0,
};

export function selectSpread(state: TarotState): Spread | null {
  if (!state.spreadId) return null;
  if (state.spreadId === "free") {
    const count =
      state.step === "draw"
        ? Math.min(FREE_SPREAD_MAX, state.placed.length + 1)
        : Math.max(1, state.placed.length);
    return buildFreeSpread(count);
  }
  return getSpread(state.spreadId) ?? null;
}

export function selectIsFree(state: TarotState): boolean {
  return state.spreadId === "free";
}

/** Whether the crystal ball can be touched to flip the cards. */
export function selectCanReveal(state: TarotState): boolean {
  if (state.step !== "draw") return false;
  if (state.spreadId === "free") return state.placed.length >= 1;
  const spread = selectSpread(state);
  return !!spread && state.placed.length >= spread.positions.length;
}

export function selectRemainingSlots(state: TarotState): number {
  if (state.spreadId === "free") return FREE_SPREAD_MAX - state.placed.length;
  const spread = selectSpread(state);
  return spread ? spread.positions.length - state.placed.length : 0;
}

export function tarotReducer(state: TarotState, action: TarotAction): TarotState {
  switch (action.type) {
    case "START":
      return { ...state, step: "spread" };

    case "PICK_SPREAD":
      return {
        ...state,
        step: "draw",
        spreadId: action.spreadId,
        deck: shuffleDeck(state.allowReversed),
        placed: [],
        activeCard: null,
        session: state.session + 1,
      };

    case "DRAW_CARD": {
      if (state.step !== "draw") return state;
      if (selectRemainingSlots(state) <= 0) return state;
      const drawn = state.deck[action.deckIndex];
      if (!drawn) return state;
      const deck = state.deck.filter((_, i) => i !== action.deckIndex);
      const placedCard: PlacedCard = {
        positionIndex: state.placed.length,
        card: drawn.card,
        reversed: drawn.reversed,
        layoutId: drawn.layoutId,
      };
      return { ...state, deck, placed: [...state.placed, placedCard] };
    }

    case "UNDO_DRAW": {
      if (state.step !== "draw" || state.placed.length === 0) return state;
      const last = state.placed[state.placed.length - 1];
      const returned: DeckCard = {
        card: last.card,
        reversed: last.reversed,
        layoutId: last.layoutId,
      };
      return {
        ...state,
        placed: state.placed.slice(0, -1),
        deck: [...state.deck, returned],
      };
    }

    case "REVEAL":
      if (!selectCanReveal(state)) return state;
      return { ...state, step: "reading" };

    case "OPEN_CARD":
      if (state.step !== "reading" && state.step !== "summary") return state;
      return { ...state, activeCard: action.index };

    case "FINISH":
      if (state.step !== "reading") return state;
      return { ...state, step: "summary", activeCard: null };

    case "RESTART":
      return { ...state, step: "spread", spreadId: null, deck: [], placed: [], activeCard: null };

    case "HOME":
      return { ...initialState, allowReversed: state.allowReversed, session: state.session };

    case "SET_REVERSED":
      return { ...state, allowReversed: action.allowReversed };

    default:
      return state;
  }
}
