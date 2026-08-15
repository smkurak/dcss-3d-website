/**
 * Склейка URL с учётом `base` из astro.config.mjs.
 *
 * Зачем: на GitHub Pages сайт часто живёт не в корне домена, а в /REPO/.
 * Astro знает об этом через import.meta.env.BASE_URL, но НЕ переписывает
 * руками написанные href="/..." и src="/...". Абсолютный путь /media/hero.webm
 * на USER.github.io/REPO/ уедет в USER.github.io/media/hero.webm и даст 404 —
 * классическая поломка «локально работало, на Pages белый экран».
 *
 * Поэтому любой путь до файла из public/ и любая внутренняя ссылка идут
 * через эти две функции. Смена base становится правкой одной строки конфига.
 *
 * Файлы из src/assets/ (шрифты) сюда не относятся: их обрабатывает Vite,
 * он подставляет base сам.
 */

const BASE = import.meta.env.BASE_URL;

/** Путь к файлу из public/: asset('media/hero.webm') -> '/REPO/media/hero.webm' */
export function asset(path: string): string {
  return `${BASE.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

/** Внутренняя ссылка: href('/devlog') -> '/REPO/devlog/' */
export function href(path: string): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!clean) return `${BASE.replace(/\/+$/, '')}/`;
  return `${BASE.replace(/\/+$/, '')}/${clean}/`;
}
