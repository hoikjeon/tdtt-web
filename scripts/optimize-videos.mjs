/**
 * public/video/*.mp4 를 웹용으로 재인코딩한다.
 *
 * 이 영상들은 전부 <video muted loop> 배경 장식용인데
 *  - 쓰지도 않는 오디오 트랙이 들어 있고
 *  - HEVC(브라우저 호환성 불안정) 또는 과도한 비트레이트로 인코딩되어 있다.
 *
 *   node scripts/optimize-videos.mjs           # <name>.opt.mp4 로 출력
 *   node scripts/optimize-videos.mjs --replace # 원본을 덮어씀
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const DIR = path.join(process.cwd(), "public", "video");
const MAX_WIDTH = 1280;
const MAX_FPS = 30;
const CRF = 26;
const replace = process.argv.includes("--replace");

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)}MB`;

let before = 0;
let after = 0;

for (const name of readdirSync(DIR).filter((f) => f.toLowerCase().endsWith(".mp4"))) {
  const src = path.join(DIR, name);
  if (name.endsWith(".opt.mp4")) continue;

  const tmp = path.join(DIR, `.tmp-${name}`);
  const size = statSync(src).size;

  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i", src,
      "-an",                                    // 어차피 muted 재생 — 오디오 제거
      "-c:v", "libx264",                        // HEVC -> H.264 (호환성)
      "-profile:v", "high",
      "-crf", String(CRF),
      "-preset", "medium",
      "-pix_fmt", "yuv420p",
      "-vf", `scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,fps='min(${MAX_FPS},source_fps)'`,
      "-movflags", "+faststart",                // 앞부분만 받아도 재생 시작
      tmp,
    ],
    { stdio: ["ignore", "ignore", "ignore"] }
  );

  const outSize = statSync(tmp).size;
  before += size;
  after += outSize;

  const dest = replace ? src : path.join(DIR, name.replace(/\.mp4$/i, ".opt.mp4"));
  renameSync(tmp, dest);

  const pct = (100 - (outSize / size) * 100).toFixed(0);
  console.log(`${name.padEnd(22)} ${mb(size).padStart(8)} -> ${mb(outSize).padStart(8)}  (-${pct}%)`);
}

console.log(`\n총합: ${mb(before)} -> ${mb(after)}  (-${(100 - (after / before) * 100).toFixed(1)}%)`);
if (!replace) console.log("원본 유지됨. 확인 후 --replace 로 교체.");
