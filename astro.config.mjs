// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// --- Деплой -----------------------------------------------------------------
// Две настройки ниже — единственное, что нужно поменять под конкретный хостинг.
//
// Сейчас настроено под project page: репозиторий smkurak/dcss-3d-website
// публикуется по адресу https://smkurak.github.io/dcss-3d-website/ — то есть
// НЕ в корне домена, отсюда base.
//
// Если появится свой домен или репозиторий переименуют в smkurak.github.io,
// станет   base: '/'   — и это единственная правка, потому что все пути идут
// через src/lib/paths.ts, а шрифты обрабатывает Vite.
//
// Netlify: site — адрес сайта, base: '/'.
// ---------------------------------------------------------------------------
export default defineConfig({
  site: 'https://smkurak.github.io',
  base: '/dcss-3d-website',
  trailingSlash: 'ignore',
  build: {
    // Ссылки в собранной статике — относительные к base, а не абсолютные к домену.
    format: 'directory',
  },
  // Карта сайта собирается из готовых страниц, адреса берутся из site + base.
  // Ссылку на неё отдаёт src/pages/robots.txt.ts.
  integrations: [sitemap()],

  server: {
    // Явный IPv4. По умолчанию Astro слушает `localhost`, а node на Windows
    // резолвит его в ::1 и биндится только туда — браузер при этом идёт
    // на 127.0.0.1 и получает ERR_CONNECTION_REFUSED.
    //
    // Посмотреть с телефона (вёрстка проверяется только так):
    //     npm run dev -- --host
    // Тогда сервер поднимется на всех интерфейсах и покажет адрес в сети.
    host: '127.0.0.1',
    port: 4321,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
