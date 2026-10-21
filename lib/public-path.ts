/** Prefix for files in `public/`. GitHub Pages serves this site from `/Tarot_web`. */
export function publicPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
