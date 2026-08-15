#!/usr/bin/env node
/**
 * Пережимает исходники из media-src/ в то, что реально едет на сайт (public/media/).
 *
 * Главное здесь — гифка. Исходник 74 МБ; отдавать такое с первого экрана нельзя,
 * особенно на телефон с реддита. Гифка — это последовательность несжатых кадров
 * без межкадрового сжатия, видеокодек сжимает то же самое в ~140 раз.
 *
 *   screen_gameplay_01.gif   74 МБ
 *     -> hero.webm            ~0.5 МБ   VP9, основной вариант
 *     -> hero.mp4             ~0.9 МБ   H.264, для Safari и старых устройств
 *     -> hero-poster.webp     ~37 КБ    первый кадр, показывается до старта видео
 *
 * Требуется ffmpeg в PATH.  Запуск: npm run media
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = join(ROOT, 'media-src');
const OUT = join(ROOT, 'public', 'media');
// Манифест с размерами: чтобы в разметке стояли настоящие width/height
// (без них картинки при загрузке дёргают вёрстку), а руками их не поддерживать.
const MANIFEST = join(ROOT, 'src', 'data', 'shots.json');

// Ширина героя. 1440 хватает: на десктопе видео шире 1200 не показывается,
// на телефоне уходит в down-scale. Больше — только лишние байты.
const HERO_WIDTH = 1440;
// Две ширины скриншотов под srcset: 1600 для 2x-экранов, 800 для телефонов.
const SHOT_WIDTHS = [1600, 800];

const kb = (p) => (statSync(p).size / 1024).toFixed(0);
const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1);

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: ['ignore', 'inherit', 'inherit'] });
}

function requireFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  } catch {
    console.error('!! ffmpeg не найден в PATH. https://ffmpeg.org/download.html');
    process.exit(1);
  }
}

function buildHero() {
  const src = join(SRC, 'screen_gameplay_01.gif');
  if (!existsSync(src)) {
    console.error(`!! нет исходника ${src}`);
    return;
  }
  console.log(`gif ${mb(src)} МБ -> видео`);

  const scale = `scale=${HERO_WIDTH}:-2:flags=lanczos`;

  // VP9: меньше по размеру, поддерживается везде кроме старого Safari.
  // crf 34 + b:v 0 — режим постоянного качества, для скринкаста с плоскими
  // заливками интерфейса этого достаточно.
  ffmpeg(['-i', src, '-vf', scale,
    '-c:v', 'libvpx-vp9', '-crf', '34', '-b:v', '0',
    '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2',
    '-pix_fmt', 'yuv420p', '-an', join(OUT, 'hero.webm')]);
  console.log(`   hero.webm         ${kb(join(OUT, 'hero.webm'))} КБ`);

  // H.264 High + faststart: mp4 начинает играть, не дожидаясь конца загрузки.
  ffmpeg(['-i', src, '-vf', scale,
    '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-profile:v', 'high',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', join(OUT, 'hero.mp4')]);
  console.log(`   hero.mp4          ${kb(join(OUT, 'hero.mp4'))} КБ`);

  // Постер: кадр на 1-й секунде. Показывается сразу, пока видео качается,
  // и остаётся единственной картинкой при prefers-reduced-motion.
  ffmpeg(['-ss', '1.0', '-i', src, '-vframes', '1', '-vf', scale,
    '-c:v', 'libwebp', '-quality', '72', join(OUT, 'hero-poster.webp')]);
  console.log(`   hero-poster.webp  ${kb(join(OUT, 'hero-poster.webp'))} КБ`);
}

function probeSize(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file]).toString().trim();
  const [w, h] = out.split('x').map(Number);
  return { w, h };
}

function buildShots() {
  const shots = readdirSync(SRC).filter((f) => /^screen__\d+\.png$/i.test(f)).sort();
  if (!shots.length) return;
  console.log(`скриншоты: ${shots.length} шт.`);

  const manifest = [];

  for (const file of shots) {
    const src = join(SRC, file);
    const stem = basename(file, extname(file));
    for (const w of SHOT_WIDTHS) {
      const out = join(OUT, `${stem}-${w}.webp`);
      ffmpeg(['-i', src, '-vf', `scale=${w}:-2:flags=lanczos`,
        '-c:v', 'libwebp', '-quality', '78', out]);
      console.log(`   ${stem}-${w}.webp`.padEnd(28) + `${kb(out)} КБ  (из ${mb(src)} МБ)`);
    }
    // Размеры берём у самого широкого варианта — соотношение сторон у всех одно.
    const { w, h } = probeSize(join(OUT, `${stem}-${SHOT_WIDTHS[0]}.webp`));
    manifest.push({ id: stem, width: w, height: h, widths: SHOT_WIDTHS });
  }

  mkdirSync(dirname(MANIFEST), { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`   -> src/data/shots.json (${manifest.length} записей)`);
}

requireFfmpeg();
mkdirSync(OUT, { recursive: true });
buildHero();
buildShots();
console.log('готово -> public/media/');
