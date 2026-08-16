/**
 * Всё, что придётся править руками, собрано здесь, чтобы не искать по шаблонам.
 *
 * Здесь только то, что НЕ зависит от языка: адреса и имена собственные.
 * Весь текст — в src/i18n/ui.ts.
 */

import type { Strings } from './i18n/ui';

export const site = {
  name: 'DCSS 3D',

  github: 'https://github.com/smkurak/dcss-3d-website',
  repo: 'github.com/smkurak/dcss-3d-website',

  // Апстрим — сама игра. Ссылка обязательна: весь геймплей их.
  upstream: 'https://github.com/crawl/crawl',
  upstreamName: 'Dungeon Crawl Stone Soup',
} as const;

/**
 * Строки блока характеристик. Набраны моноширинным — по правилу из
 * style-guide.md: моноширинный несёт техническое, гротеск — наше.
 *
 * Здесь только СТРУКТУРА: здесь только СТРУКТУРА — какие строки, в каком
 * порядке и какие подсвечены. Сам текст живёт в src/i18n/ui.ts, иначе его
 * пришлось бы держать в двух местах на четырёх языках.
 *
 * `tone` — цвет как признак смысла, ровно как в клиенте, где зелёный это
 * HP, а оранжевый — предупреждение. Раскрашены две строки, и намеренно
 * противоположные: что стоит незыблемо и что в движении. Это и есть главный
 * тезис проекта — асимметрия вклада. Больше двух точек — уже имитация
 * интерфейса, а не сходство с ним.
 *
 * `client source` и `builds` отвечают на вопросы, которые иначе задаст каждый
 * пришедший: «где код» и «как попробовать». Ответ «пока никак» честнее
 * молчания и честнее кнопки, которая никуда не ведёт.
 */
export const specs: ReadonlyArray<{
  key: keyof Strings['home']['specKeys'];
  value: keyof Strings['home']['specValues'];
  tone?: 'hp' | 'warning';
}> = [
  { key: 'engine', value: 'unity' },
  { key: 'gameLogic', value: 'upstreamUnmodified', tone: 'hp' },
  { key: 'builtHere', value: 'rendererUi' },
  { key: 'status', value: 'inDevelopment', tone: 'warning' },
  { key: 'clientSource', value: 'notPublicYet' },
  { key: 'builds', value: 'noneYet' },
];
