import type { Spread } from "./types";

export const SPREADS: Spread[] = [
  {
    id: "single",
    name: "单张指引",
    nameEn: "One Card",
    tagline: "今日一问，一牌作答",
    description: "最轻盈的占卜方式。心中默念一个问题，抽一张牌，让它给你今天的指引。",
    aspect: 1.2,
    cardWidth: 30,
    accent: "lemon",
    positions: [{ id: "answer", title: "指引", meaning: "这张牌是宇宙对你问题的直接回应。", x: 50, y: 50 }],
  },
  {
    id: "time",
    name: "时间之流",
    nameEn: "Past · Present · Future",
    tagline: "过去 · 现在 · 未来",
    description: "经典三牌阵。看清事情从何而来、此刻处在何处，以及若保持现状将走向何方。",
    aspect: 2,
    cardWidth: 20,
    accent: "mint",
    positions: [
      { id: "past", title: "过去", meaning: "塑造了当前处境的根源与经历。", x: 22, y: 50 },
      { id: "present", title: "现在", meaning: "你此刻正面对的核心能量与挑战。", x: 50, y: 50 },
      { id: "future", title: "未来", meaning: "顺着当前轨迹，最可能出现的发展。", x: 78, y: 50 },
    ],
  },
  {
    id: "choice",
    name: "二选一",
    nameEn: "Two Paths",
    tagline: "在岔路口看清两条路",
    description: "当你在两个选项之间摇摆不定时，这个牌阵会分别呈现每条路的样貌与结果。",
    aspect: 1.3,
    cardWidth: 18,
    accent: "sky",
    positions: [
      { id: "self", title: "你的现状", meaning: "你此刻的心态与所处的位置。", x: 50, y: 48 },
      { id: "a-now", title: "选项 A · 现况", meaning: "选择 A 的当下状态与它所需要的付出。", x: 25, y: 70 },
      { id: "b-now", title: "选项 B · 现况", meaning: "选择 B 的当下状态与它所需要的付出。", x: 75, y: 70 },
      { id: "a-result", title: "选项 A · 结果", meaning: "走上 A 这条路最可能的结果。", x: 25, y: 26 },
      { id: "b-result", title: "选项 B · 结果", meaning: "走上 B 这条路最可能的结果。", x: 75, y: 26 },
    ],
  },
  {
    id: "love",
    name: "恋爱关系",
    nameEn: "Relationship",
    tagline: "你、TA 与你们之间",
    description: "从双方的内心出发，看看这段关系的联结、潜在的阻碍，以及它正走向的方向。",
    aspect: 1.2,
    cardWidth: 14,
    accent: "sakura",
    positions: [
      { id: "you", title: "你", meaning: "你在这段关系中的感受与态度。", x: 20, y: 50 },
      { id: "them", title: "TA", meaning: "对方在这段关系中的感受与态度。", x: 80, y: 50 },
      { id: "bond", title: "联结", meaning: "将你们连在一起的核心能量。", x: 50, y: 21 },
      { id: "obstacle", title: "阻碍", meaning: "关系中需要被看见与处理的课题。", x: 50, y: 79 },
      { id: "outcome", title: "走向", meaning: "若继续当前的互动方式，关系最可能的发展。", x: 50, y: 50 },
    ],
  },
  {
    id: "hexagram",
    name: "六芒星",
    nameEn: "Hexagram",
    tagline: "全方位审视一件事",
    description: "七张牌组成六芒星，兼顾时间线、自身心态、外部环境与建议，适合深入探讨一个具体问题。",
    aspect: 1.1,
    cardWidth: 15,
    accent: "lavender",
    positions: [
      { id: "past", title: "过去", meaning: "问题的起因与背景。", x: 28, y: 32 },
      { id: "present", title: "现在", meaning: "事情目前的状态。", x: 50, y: 14 },
      { id: "future", title: "未来", meaning: "近期最可能的发展。", x: 72, y: 32 },
      { id: "attitude", title: "你的态度", meaning: "你面对这件事的内在心态。", x: 28, y: 68 },
      { id: "environment", title: "外部环境", meaning: "周围的人、事与条件带来的影响。", x: 72, y: 68 },
      { id: "advice", title: "建议", meaning: "此刻最值得采取的行动或心态。", x: 50, y: 86 },
      { id: "outcome", title: "结果", meaning: "综合以上因素的最终走向。", x: 50, y: 50 },
    ],
  },
  {
    id: "celtic",
    name: "凯尔特十字",
    nameEn: "Celtic Cross",
    tagline: "最经典的十牌深度解读",
    description: "塔罗中最著名的牌阵。十张牌层层展开，从核心议题到潜意识、希望与恐惧，直到最终结果。",
    aspect: 1.25,
    cardWidth: 10.5,
    accent: "peach",
    positions: [
      { id: "heart", title: "现状", meaning: "问题的核心，你此刻所处的位置。", x: 33, y: 50 },
      { id: "cross", title: "阻碍 / 助力", meaning: "横在眼前、与现状交错的力量。", x: 33, y: 50, rotate: 90 },
      { id: "root", title: "根基", meaning: "潜意识层面，事情真正的根源。", x: 33, y: 85 },
      { id: "past", title: "过去", meaning: "刚刚过去、正在远离的影响。", x: 12, y: 50 },
      { id: "crown", title: "目标", meaning: "你有意识追求的目标或最好的可能。", x: 33, y: 15 },
      { id: "future", title: "近未来", meaning: "即将进入你生活的能量。", x: 54, y: 50 },
      { id: "self", title: "自我", meaning: "你对自己与处境的看法。", x: 84, y: 86 },
      { id: "environment", title: "环境", meaning: "他人与外部环境对你的影响。", x: 84, y: 62 },
      { id: "hopes", title: "希望与恐惧", meaning: "你内心深处的期待与担忧。", x: 84, y: 38 },
      { id: "outcome", title: "结果", meaning: "综合所有因素的最终走向。", x: 84, y: 14 },
    ],
  },
];

/** "跳过不选" 时使用的自由牌阵：最多 5 张，横排。 */
export const FREE_SPREAD_MAX = 5;

export function buildFreeSpread(count: number): Spread {
  const n = Math.max(1, Math.min(FREE_SPREAD_MAX, count));
  const positions = Array.from({ length: n }, (_, i) => ({
    id: `free-${i}`,
    title: `第 ${i + 1} 张`,
    meaning: "",
    x: n === 1 ? 50 : 12 + (76 * i) / (n - 1),
    y: 50,
  }));
  return {
    id: "free",
    name: "自由抽牌",
    nameEn: "Free Draw",
    tagline: "不设牌阵，随心而抽",
    description: "不限定牌位含义，抽 1 到 5 张牌，凭直觉解读。",
    aspect: 2.2,
    cardWidth: 16,
    accent: "lavender",
    positions,
  };
}

export function getSpread(id: string): Spread | undefined {
  return SPREADS.find((s) => s.id === id);
}
