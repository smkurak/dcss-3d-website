/**
 * Всё, что придётся править руками, собрано здесь, чтобы не искать по шаблонам.
 */

export const site = {
  name: 'DCSS 3D',
  title: 'DCSS 3D — a 3D client for Dungeon Crawl Stone Soup',
  description:
    'A Unity renderer and interface for Dungeon Crawl Stone Soup. ' +
    'All game logic stays upstream; only rendering and UI are built here. ' +
    'Hobby project, open source.',

  // Картинка для соцсетей — сейчас постер первого кадра. Alt читают
  // скринридеры в лентах, где картинка есть, а страницы ещё нет.
  ogImageAlt:
    'The DCSS 3D client: a stone dungeon rendered in 3D, with the character ' +
    'panel, minimap and message log along the edges.',

  github: 'https://github.com/smkurak/dcss-3d-website',
  repo: 'github.com/smkurak/dcss-3d-website',

  // Апстрим — сама игра. Ссылка обязательна: весь геймплей их.
  upstream: 'https://github.com/crawl/crawl',
  upstreamName: 'Dungeon Crawl Stone Soup',
} as const;

/**
 * Технические факты для строки под текстом. Набраны моноширинным —
 * по правилу из style-guide.md: моноширинный несёт техническое, гротеск — наше.
 */
export const specs: ReadonlyArray<{ key: string; value: string }> = [
  { key: 'engine', value: 'Unity' },
  { key: 'game logic', value: 'upstream, unmodified' },
  { key: 'built here', value: 'renderer + UI' },
  { key: 'status', value: 'in development' },
];
