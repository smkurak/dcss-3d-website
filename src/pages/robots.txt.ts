import type { APIContext } from 'astro';
import { asset } from '../lib/paths';

/**
 * robots.txt отдаётся страницей, а не лежит в public/, ради одной строки —
 * адреса карты сайта. Он обязан быть абсолютным, и в статическом файле его
 * пришлось бы вписать руками и потом не забыть при смене домена.
 * Здесь он собирается из `site` и `base` в astro.config.mjs.
 */
export async function GET(context: APIContext) {
  const sitemap = new URL(asset('sitemap-index.xml'), context.site);

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap.href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
