// Downloads the 78 public-domain Rider–Waite–Smith (1909) card scans from
// Wikimedia Commons and writes resized JPEGs to public/cards/<id>.jpg.
// Run with: npm run fetch-cards
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/cards");
const WIDTH = 400;
// Commons rate-limits Special:FilePath aggressively; keep it sequential and polite.
const CONCURRENCY = 1;
const DELAY_MS = 700;
const MAX_RETRIES = 5;
const UA = "macaron-tarot/0.1 (local asset fetch script)";

const MAJORS = [
  "Fool",
  "Magician",
  "High_Priestess",
  "Empress",
  "Emperor",
  "Hierophant",
  "Lovers",
  "Chariot",
  "Strength",
  "Hermit",
  "Wheel_of_Fortune",
  "Justice",
  "Hanged_Man",
  "Death",
  "Temperance",
  "Devil",
  "Tower",
  "Star",
  "Moon",
  "Sun",
  "Judgement",
  "World",
];

const SUITS = [
  ["wands", "Wands"],
  ["cups", "Cups"],
  ["swords", "Swords"],
  ["pentacles", "Pents"],
];

const jobs = [];
MAJORS.forEach((name, i) => {
  const n = String(i).padStart(2, "0");
  jobs.push({ id: `major-${n}`, file: `RWS_Tarot_${n}_${name}.jpg` });
});
for (const [id, commons] of SUITS) {
  for (let i = 1; i <= 14; i++) {
    const n = String(i).padStart(2, "0");
    jobs.push({ id: `${id}-${n}`, file: `${commons}${n}.jpg` });
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchOne({ id, file }) {
  const dest = path.join(OUT_DIR, `${id}.jpg`);
  if (await exists(dest)) return `skip ${id}`;
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}`;
  let res;
  for (let attempt = 0; ; attempt++) {
    res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (res.ok) break;
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const wait = 2000 * 2 ** attempt;
      console.log(`429  ${id}, retrying in ${wait / 1000}s`);
      await sleep(wait);
      continue;
    }
    throw new Error(`${id}: HTTP ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await sleep(DELAY_MS);
  const out = await sharp(buf)
    .resize({ width: WIDTH })
    .jpeg({ quality: 74, mozjpeg: true })
    .toBuffer();
  await writeFile(dest, out);
  return `ok   ${id} (${Math.round(out.length / 1024)} KB)`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const queue = [...jobs];
  const failures = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const job = queue.shift();
        try {
          console.log(await fetchOne(job));
        } catch (err) {
          failures.push(job.id);
          console.error(String(err));
        }
      }
    }),
  );
  if (failures.length) {
    console.error(`\n${failures.length} card(s) failed: ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log(`\nDone. ${jobs.length} cards in ${OUT_DIR}`);
}

main();
