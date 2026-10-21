# 马卡龙塔罗占卜屋 · Macaron Tarot

一个三渲二（赛璐璐描边 + 硬阴影）少女马卡龙配色的韦特塔罗占卜网页。CSS 3D 翻牌、水晶球触发翻牌、78 张牌完整中文释义。

## 占卜流程

1. **进入网页** — 首页 Hero，点击「开始占卜」。
2. **选牌阵** — 单张指引、时间之流（过去/现在/未来）、二选一、恋爱关系、六芒星、凯尔特十字；也可「跳过，直接抽牌」进入自由模式（1–5 张）。可在右上角开关「允许逆位」。
3. **抽牌** — 从底部扇形牌堆点牌，牌会飞到牌阵对应的下一个空位（背面朝上），支持「撤回一张」。
4. **摸水晶球** — 牌位抽满后水晶球开始发光，点击/触摸它，所有牌依次 3D 翻开（逆位牌会倒转）。
5. **看释义** — 点击任意一张牌，弹窗显示牌面大图、正/逆位、关键词、牌义与牌位含义，可左右切换。
6. **结束占卜** — 进入总结页，查看一句话结论与全部牌面，可「再占一次」或「回到首页」。

## 技术栈

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)（Button / Dialog / Badge / Switch / Tooltip）
- [framer-motion](https://www.framer.com/motion/)：牌堆飞牌（共享 `layoutId`）、3D 翻牌、屏幕切换
- 纯前端，无后端、无数据库、无登录

## 本地运行

```bash
npm install
npm run dev
```

打开 <http://localhost:4873>。

其他脚本：

```bash
npm run build        # 生产构建
npm run start        # 以生产模式启动（端口 4873）
npm run lint         # ESLint
npm run fetch-cards  # 重新下载牌面图片（见下）
```

## 目录结构

```
app/                      布局、全局样式（马卡龙色板、三渲二工具类）、首页
components/tarot/
  TarotApp.tsx            顶层状态机 + 屏幕切换
  IntroScreen.tsx         首页
  SpreadPicker.tsx        牌阵选择
  ReadingTable.tsx        占卜桌：牌阵 + 水晶球 + 牌堆
  SpreadBoard.tsx         透视桌面与牌位
  DeckFan.tsx             扇形牌堆
  TarotCard.tsx           3D 翻转卡牌（含图片加载失败兜底）
  CrystalBall.tsx         水晶球
  CardMeaningDialog.tsx   释义弹窗
  SummaryScreen.tsx       结束总结
components/ui/            shadcn/ui 组件
lib/tarot/
  cards.ts                78 张牌数据与中文释义
  spreads.ts              牌阵定义（牌位坐标、含义）
  shuffle.ts              洗牌与随机逆位
  state.ts                useReducer 状态机
scripts/fetch-cards.mjs   从 Wikimedia Commons 下载并压缩牌面
public/cards/             78 张牌面（JPG，约 4.4 MB）
public/card-back.svg      自绘牌背
```

## 牌面素材与版权

牌面使用 1909 年 Rider–Waite–Smith 塔罗（Pamela Colman Smith 绘）的扫描图，来源于 [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck)，在美国及多数地区已进入公有领域。图片已缩放到 400px 宽并提交到仓库，运行时无需联网。

如需重新获取：`npm run fetch-cards`（脚本按顺序、带限速地请求 Commons，避免 429）。

## 说明

- 占卜结果由前端随机（`crypto.getRandomValues`）生成，仅供娱乐与自我觉察。
- 牌面/牌背为 `next/image` 的 `unoptimized` 模式加载，图片加载失败时会显示带卡名的马卡龙占位牌面。
