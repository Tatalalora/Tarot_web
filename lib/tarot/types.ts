export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles";

export interface TarotCardData {
  id: string;
  name: string;
  nameEn: string;
  arcana: Arcana;
  suit?: Suit;
  /** 0–21 for majors, 1–14 for minors (11 侍从, 12 骑士, 13 王后, 14 国王) */
  number: number;
  keywords: string[];
  upright: string;
  reversed: string;
  image: string;
}

export interface SpreadPosition {
  id: string;
  title: string;
  meaning: string;
  /** Percent coordinates (0–100) of the card center on the board */
  x: number;
  y: number;
  /** Degrees; the Celtic Cross "crossing" card is laid sideways */
  rotate?: number;
}

export interface Spread {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  positions: SpreadPosition[];
  /** Board aspect ratio width/height; used to size the table */
  aspect: number;
  /** Card width as a percentage of the board width */
  cardWidth: number;
  accent: "mint" | "lavender" | "sakura" | "lemon" | "peach" | "sky";
}

export interface PlacedCard {
  positionIndex: number;
  card: TarotCardData;
  reversed: boolean;
  /** Stable id for framer-motion layout animation between deck and board */
  layoutId: string;
}
