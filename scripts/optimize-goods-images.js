/**
 * Goods Image Optimization Pipeline
 * Generates AVIF + WebP + JPEG variants at 480/800/1200px from source PNGs.
 * Run: node scripts/optimize-goods-images.js
 */

const path = require('path');
const fs = require('fs');
const sharp = require(path.join(process.cwd(), 'node_modules', 'sharp'));

// ── CONFIG ───────────────────────────────────────────────────────────────────
const SRC_DIR  = path.join(process.cwd(), 'goods');              // source masters
const OUT_DIR  = path.join(process.cwd(), 'public', 'images', 'goods-optimized'); // delivery output
const WIDTHS   = [480, 800, 1200];                               // responsive breakpoints
const QUALITY  = { avif: 72, webp: 80, jpeg: 82 };             // visually lossless

// ── SETUP ────────────────────────────────────────────────────────────────────
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR)
  .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
  .sort();

console.log(`\n🛍️  Goods Image Optimizer`);
console.log(`   Source: ${SRC_DIR}  (${files.length} images, ${(
  files.reduce((s, f) => s + fs.statSync(path.join(SRC_DIR, f)).size, 0) / 1e6
).toFixed(1)} MB total)`);
console.log(`   Output: ${OUT_DIR}`);
console.log(`   Sizes:  ${WIDTHS.join(', ')}px  ×  AVIF + WebP + JPEG\n`);

// ── PIPELINE ─────────────────────────────────────────────────────────────────
async function optimizeOne(filename) {
  const src   = path.join(SRC_DIR, filename);
  const stem  = path.basename(filename, path.extname(filename));
  const image = sharp(src);
  const meta  = await image.metadata();

  // Square-crop to the centre (all source images are already square, this is a safety net)
  const size = Math.min(meta.width, meta.height);
  const base = sharp(src).extract({
    left:   Math.floor((meta.width  - size) / 2),
    top:    Math.floor((meta.height - size) / 2),
    width:  size,
    height: size,
  });

  const tasks = [];
  for (const w of WIDTHS) {
    const resized = () => base.clone().resize(w, w, { kernel: 'lanczos3', fit: 'cover' });
    tasks.push(
      resized().avif({ quality: QUALITY.avif }).toFile(path.join(OUT_DIR, `${stem}-${w}.avif`)),
      resized().webp({ quality: QUALITY.webp }).toFile(path.join(OUT_DIR, `${stem}-${w}.webp`)),
      resized().jpeg({ quality: QUALITY.jpeg, mozjpeg: true }).toFile(path.join(OUT_DIR, `${stem}-${w}.jpg`)),
    );
  }

  await Promise.all(tasks);

  // Also generate a tiny 20px LQIP (low-quality image placeholder) in base64 WebP
  const lqipBuf = await sharp(src)
    .resize(20, 20, { fit: 'cover' })
    .webp({ quality: 20 })
    .toBuffer();
  fs.writeFileSync(path.join(OUT_DIR, `${stem}-lqip.webp`), lqipBuf);

  return stem;
}

async function main() {
  const t0 = Date.now();
  let done = 0;

  for (const file of files) {
    const stem = await optimizeOne(file);
    done++;
    process.stdout.write(`   [${done}/${files.length}] ${stem.slice(0, 32)}...\n`);
  }

  // Size report
  const outFiles = fs.readdirSync(OUT_DIR);
  const outBytes = outFiles.reduce((s, f) => s + fs.statSync(path.join(OUT_DIR, f)).size, 0);
  const srcBytes = files.reduce((s, f) => s + fs.statSync(path.join(SRC_DIR, f)).size, 0);

  console.log(`\n✅  Done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`   Source total  : ${(srcBytes / 1e6).toFixed(1)} MB`);
  console.log(`   Output total  : ${(outBytes / 1e6).toFixed(1)} MB (${outFiles.length} files)`);
  console.log(`   Average / img : ${(outBytes / files.length / 1e3).toFixed(0)} KB per source image (all variants)`);
}

main().catch(e => { console.error(e); process.exit(1); });
