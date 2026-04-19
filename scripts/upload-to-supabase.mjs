import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = 'https://wnfykivtkqiufkkscgsr.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = 'works-media';

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌  SUPABASE_SERVICE_ROLE_KEY 환경변수가 없습니다.');
  console.error('   실행 방법: SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/upload-to-supabase.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
};

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET_NAME);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    if (error) throw new Error(`버킷 생성 실패: ${error.message}`);
    console.log(`✅  버킷 '${BUCKET_NAME}' 생성 완료`);
  } else {
    console.log(`✅  버킷 '${BUCKET_NAME}' 이미 존재함`);
  }
}

async function uploadFile(localPath, storagePath) {
  const ext = extname(localPath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const fileBuffer = readFileSync(localPath);

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, { contentType, upsert: true });

  if (error) {
    console.error(`  ❌  ${storagePath} — ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  console.log(`  ✔  ${storagePath}`);
  return data.publicUrl;
}

async function uploadFolder(folderPath, storagePrefix) {
  const entries = readdirSync(folderPath);
  const urls = {};
  for (const entry of entries) {
    if (entry.startsWith('.')) continue;
    const fullPath = join(folderPath, entry);
    if (statSync(fullPath).isFile()) {
      const storagePath = `${storagePrefix}/${entry}`;
      const url = await uploadFile(fullPath, storagePath);
      if (url) urls[entry] = url;
    }
  }
  return urls;
}

async function main() {
  const videoDir = join(__dirname, '..', 'public', 'video');

  await ensureBucket();

  console.log('\n📁  hospital motion 업로드 중...');
  const motionUrls = await uploadFolder(join(videoDir, 'hospital motion'), 'hospital-motion');

  console.log('\n📁  admotion 업로드 중...');
  const admotionUrls = await uploadFolder(join(videoDir, 'admotion'), 'admotion');

  console.log('\n📁  adlanding 업로드 중...');
  const landingUrls = await uploadFolder(join(videoDir, 'adlanding'), 'adlanding');

  console.log('\n🎬  영상 파일 업로드 중...');
  const video1Url = await uploadFile(join(videoDir, 'motion video1.mp4'), 'motion-video1.mp4');
  const video2Url = await uploadFile(join(videoDir, 'motionvideo2.mp4'), 'motionvideo2.mp4');

  const BASE = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;

  console.log('\n\n========================================');
  console.log('✅  업로드 완료! 아래 URL을 코드에 사용하세요:');
  console.log('========================================\n');

  console.log('// hospital motion 이미지 (motion1~16):');
  for (let i = 1; i <= 16; i++) {
    console.log(`"${BASE}/hospital-motion/motion${i}.jpg",`);
  }

  console.log('\n// admotion 이미지 (admotion1~12):');
  for (let i = 1; i <= 12; i++) {
    console.log(`"${BASE}/admotion/admotion${i}.jpg",`);
  }

  console.log('\n// adlanding 이미지 (landing1~12):');
  for (let i = 1; i <= 12; i++) {
    console.log(`"${BASE}/adlanding/landing${i}.png",`);
  }

  console.log(`\n// 영상:`);
  console.log(`motion video1: "${BASE}/motion-video1.mp4"`);
  console.log(`motionvideo2:  "${BASE}/motionvideo2.mp4"`);
}

main().catch(console.error);
