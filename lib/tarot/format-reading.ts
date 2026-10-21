import type { PlacedCard, Spread } from "./types";

/** One line per drawn card: 牌位 - 正位/逆位 - 牌名. */
export function formatDrawnCards(spread: Spread, placed: PlacedCard[]): string {
  return placed
    .map((p) => {
      const position = spread.positions[p.positionIndex];
      const title = position?.title ?? `第 ${p.positionIndex + 1} 张`;
      const orientation = p.reversed ? "逆位" : "正位";
      return `${title} - ${orientation} - ${p.card.name}`;
    })
    .join("\n");
}
