import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { href } from '../lib/paths';
import { getPosts } from '../lib/devlog';

/**
 * RSS для devlog: /rss.xml
 *
 * Для технической аудитории лента дешевле подписки на что бы то ни было —
 * и не требует от сайта ни аккаунтов, ни почты, ни трекеров.
 *
 * Ссылки идут через href(), то есть с учётом base; @astrojs/rss приклеит
 * к ним домен из `site` в astro.config.mjs. Пакет берётся ради правильного
 * экранирования XML — руками там ошибаются на первом же апострофе.
 */
export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: `${site.name} — devlog`,
    description: 'Development notes on building a 3D client for Dungeon Crawl Stone Soup.',
    // context.site — это голый домен из astro.config.mjs, без base. Если
    // отдать его как есть, <link> канала укажет на smkurak.github.io/,
    // где лежит чужая страница (или 404). Читалка показывает эту ссылку
    // как «перейти на сайт», поэтому склеиваем с base.
    //
    // На ссылки постов это не влияет: href() уже даёт путь от корня домена,
    // а такой путь резолвится одинаково при любом base у `site`.
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: href(`/devlog/${post.id}`),
    })),
  });
}
