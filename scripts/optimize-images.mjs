/**
 * public/ 안의 큰 이미지를 WebP로 변환한다.
 *
 * next.config.ts가 output:'export' + images.unoptimized 이므로
 * Next의 자동 이미지 최적화가 동작하지 않는다. 원본 자체를 줄여야 한다.
 *
 *   node scripts/optimize-images.mjs          # 변환 (원본 유지)
 *   node scripts/optimize-images.mjs --prune  # 변환 후 원본 삭제
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public");
const MIN_BYTES = 100 * 1024; // 100KB 미만은 건드리지 않는다
const MAX_WIDTH = 1920;
const QUALITY = 80;
const EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const prune = process.argv.includes("--prune");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

let before = 0;
let after = 0;
const rows = [];

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  // hospital1처럼 확장자가 없는 파일도 이미지일 수 있어 sharp로 판별한다
  const isCandidate = EXTS.has(ext) || ext === "";
  if (!isCandidate) continue;

  const { size } = await stat(file);
  if (size < MIN_BYTES) continue;

  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    continue; // 이미지가 아님
  }

  const out = file.slice(0, file.length - ext.length) + ".webp";
  const buf = await sharp(file)
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  // 더 커지면 의미가 없다
  if (buf.length >= size && out === file) continue;

  await sharp(buf).toFile(out);
  before += size;
  after += buf.length;
  rows.push([path.relative(ROOT, file), size, buf.length, meta.width, meta.height]);

  if (prune && out !== file) await unlink(file);
}

rows.sort((a, b) => b[1] - a[1]);
for (const [name, s, d, w, h] of rows) {
  const pct = (100 - (d / s) * 100).toFixed(0);
  console.log(`${name.padEnd(42)} ${kb(s).padStart(8)} -> ${kb(d).padStart(8)}  (-${pct}%)  ${w}x${h}`);
}
console.log(`\n${rows.length} files:  ${kb(before)} -> ${kb(after)}  (-${(100 - (after / before) * 100).toFixed(1)}%)`);
if (!prune) console.log("원본 유지됨. 검증 후 --prune 으로 삭제.");
