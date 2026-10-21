import { TAROT_CARDS } from "./cards";
import type { TarotCardData } from "./types";

export interface DeckCard {
  card: TarotCardData;
  reversed: boolean;
  layoutId: string;
}

function randomInt(max: number): number {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

/** Fisher–Yates shuffle of all 78 cards with optional random reversals. */
export function shuffleDeck(allowReversed: boolean): DeckCard[] {
  const cards = [...TAROT_CARDS];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  const nonce = Date.now().toString(36);
  return cards.map((card, i) => ({
    card,
    reversed: allowReversed ? randomInt(2) === 1 : false,
    layoutId: `${nonce}-${i}-${card.id}`,
  }));
}
