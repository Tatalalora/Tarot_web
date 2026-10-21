import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, ZCOOL_KuaiLe } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const notoSC = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const zcool = ZCOOL_KuaiLe({
  variable: "--font-zcool",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "马卡龙塔罗 · 水晶球占卜",
  description: "三渲二少女马卡龙风格的韦特塔罗占卜器：选牌阵、抽牌、摸水晶球翻牌、查看释义。",
};

export const viewport: Viewport = {
  themeColor: "#fff8f3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${notoSC.variable} ${zcool.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
