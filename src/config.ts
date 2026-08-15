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
/**
 * `tone` — цвет как признак смысла, ровно как в клиенте, где зелёный это
 * HP, а оранжевый — предупреждение. Раскрашены две строки, и намеренно
 * противоположные: что стоит незыблемо и что в движении. Это и есть главный
 * тезис проекта — асимметрия вклада. Больше двух точек — уже имитация
 * интерфейса, а не сходство с ним.
 */
export const specs: ReadonlyArray<{
  key: string;
  value: string;
  tone?: 'hp' | 'warning';
}> = [
  { key: 'engine', value: 'Unity' },
  { key: 'game logic', value: 'upstream, unmodified', tone: 'hp' },
  { key: 'built here', value: 'renderer + UI' },
  { key: 'status', value: 'in development', tone: 'warning' },
  // Эти две строки отвечают на вопросы, которые иначе задаст каждый пришедший:
  // «где код» и «как попробовать». Ответ «пока никак» честнее молчания и
  // честнее кнопки, которая никуда не ведёт. Менять по мере готовности.
  { key: 'client source', value: 'not public yet' },
  { key: 'builds', value: 'none yet' },
];
