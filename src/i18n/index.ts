import { href } from '../lib/paths';
import { ui, type Strings } from './ui';

/**
 * Языки сайта.
 *
 * `name` — самоназвание: в переключателе язык всегда подписан на себе самом,
 * иначе им не воспользуется тот, кому он нужен.
 *
 * `script` — какой алфавит нужен странице. Шрифты разложены по подмножествам
 * с unicode-range, и по этому полю выбирается, какой файл класть в preload:
 * латинская страница не должна предзагружать кириллический.
 */
export const languages = {
  en: { code: 'en', name: 'English', script: 'latin' },
  ru: { code: 'ru', name: 'Русский', script: 'cyrillic' },
  de: { code: 'de', name: 'Deutsch', script: 'latin' },
  es: { code: 'es', name: 'Español', script: 'latin' },
} as const;

export type Lang = keyof typeof languages;

/** Английский лежит в корне без префикса — уже разосланные ссылки не ломаются. */
export const defaultLang: Lang = 'en';

export const langCodes = Object.keys(languages) as Lang[];

/** Языки, кроме основного, — те, что получают префикс в адресе. */
export const prefixedLangs = langCodes.filter((l) => l !== defaultLang);

export function t(lang: Lang): Strings {
  return ui[lang];
}

/**
 * Адрес страницы на нужном языке, с учётом base.
 *
 *   localePath('en', '/credits')  ->  /dcss-3d-website/credits/
 *   localePath('de', '/credits')  ->  /dcss-3d-website/de/credits/
 *   localePath('ru')              ->  /dcss-3d-website/ru/
 */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = lang === defaultLang ? '' : lang;
  return href([prefix, clean].filter(Boolean).join('/'));
}

/**
 * Значение для `hreflang`. Поисковику нужно знать, что четыре адреса —
 * это одна страница на разных языках, иначе они конкурируют между собой
 * как дубликаты. `x-default` указывает, куда вести тех, чей язык не подошёл.
 */
export function alternateLinks(
  path: string,
  site: URL | undefined,
): Array<{ hreflang: string; href: string }> {
  // Тип указан явно: без него hreflang выводится как union из кодов языков,
  // и 'x-default' в него не влезает.
  const links: Array<{ hreflang: string; href: string }> = langCodes.map((lang) => ({
    hreflang: languages[lang].code,
    href: site ? new URL(localePath(lang, path), site).href : localePath(lang, path),
  }));

  links.push({
    hreflang: 'x-default',
    href: site
      ? new URL(localePath(defaultLang, path), site).href
      : localePath(defaultLang, path),
  });

  return links;
}
