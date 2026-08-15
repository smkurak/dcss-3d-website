import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Devlog — обычные markdown-файлы в src/content/devlog/.
 * Никакой CMS: пост это файл, история правок — история git.
 *
 * Имя файла становится адресом: `render-distance.md` -> /devlog/render-distance/
 * Дата живёт во frontmatter, а не в имени файла — иначе она лезла бы в URL.
 *
 * Схема проверяется на сборке: забыли `summary` или написали дату строкой,
 * которую не разобрать, — сборка падает с внятной ошибкой, а не выкатывает
 * страницу с дырой.
 */
const devlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** Одна-две строки для списка постов, RSS и og:description. */
    summary: z.string(),
    /** draft: true — виден на localhost, но не попадает в сборку и в RSS. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { devlog };
