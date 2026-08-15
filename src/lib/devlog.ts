import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'devlog'>;

/**
 * Посты, свежие сверху. Одна функция на список, страницу поста и RSS —
 * чтобы черновики и порядок не разъезжались между ними.
 *
 * Черновики видны при `npm run dev` и отрезаются в сборке: писать пост,
 * не пряча его от себя же, удобнее, чем переключать флаг туда-сюда.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('devlog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Дата в виде 2026-08-15. Машинный формат, набирается моноширинным —
 * по тому же правилу, что и остальная техника. Заодно снимает вопрос
 * «08-15 это август или 15-е число»: аудитория международная.
 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
