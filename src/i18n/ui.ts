/**
 * Все строки сайта, по языкам.
 *
 * Английский — эталон: `Strings` выводится из него, поэтому пропущенный или
 * лишний ключ в любом другом языке становится ошибкой `astro check`, а не
 * дырой на странице.
 *
 * Что здесь НЕ переводится и почему:
 *  - названия из игры (Foxfire, Dungeon:1, Djinni) — сервер шлёт их
 *    по-английски, и style-guide требует показывать игровой текст как есть;
 *  - записи devlog — это содержательные тексты, четыре версии каждой пришлось
 *    бы поддерживать вручную. На локализованных страницах об этом сказано;
 *  - имена собственные: Unity, Astro, Tailwind, Iosevka, Manrope.
 */

const en = {
  meta: {
    title: 'DCSS 3D — a 3D client for Dungeon Crawl Stone Soup',
    description:
      'A Unity renderer and interface for Dungeon Crawl Stone Soup. ' +
      'All game logic stays upstream; only rendering and UI are built here. ' +
      'Hobby project, open source.',
    ogImageAlt:
      'The DCSS 3D client: a stone dungeon rendered in 3D, with the character ' +
      'panel, minimap and message log along the edges.',
  },

  chrome: {
    skipToContent: 'Skip to content',
    navDevlog: 'Devlog',
    languageLabel: 'Language',
    footerUpstream: {
      before: 'The game itself — rules, content and two decades of work — is ',
      after: ', by its own team. This project only renders it.',
    },
    footerCredits: 'Credits — the game, the tools, the typefaces',
    footerSiteSource: 'site source',
    footerNoTrackers: 'no trackers, no third-party requests',
  },

  home: {
    heading: 'A 3D client for Dungeon Crawl Stone Soup',
    subheading:
      'A Unity renderer and interface on top of the original game. The rules stay ' +
      'exactly where they are.',
    heroLabel:
      'Gameplay recording: the camera moves over a stone dungeon level while the ' +
      'character panel, minimap and message log update alongside.',
    sections: [
      {
        title: 'What comes from the original',
        body:
          'All the game logic stays upstream: mechanics, balance, dungeon generation, ' +
          'monster behaviour, the text. Twenty years of work that one person cannot ' +
          'reproduce, and no reason to try. Nothing here forks the game or changes how ' +
          'it plays.',
      },
      {
        title: 'What is built here',
        body:
          'Only the renderer and the interface — the part the game lacks, and the part ' +
          'that turns new players away before they reach anything else. The principle is ' +
          'asymmetry of contribution: not rewriting the game, but attaching to it the one ' +
          'piece it is missing. It is a hobby project and competes with nothing.',
      },
      {
        title: 'The test every change has to pass',
        body:
          'Is it still as readable as the original? DCSS is information-dense — one glance ' +
          'tells you where everyone stands, what is visible, what is only remembered, and ' +
          'what is dangerous. A 3D picture easily carries less than a grid of glyphs. If it ' +
          'looks better and plays worse, it has failed at the one thing it was for.',
      },
    ],
    specKeys: {
      engine: 'engine',
      gameLogic: 'game logic',
      builtHere: 'built here',
      status: 'status',
      clientSource: 'client source',
      builds: 'builds',
    },
    specValues: {
      // Имя собственное — одинаково во всех языках, но лежит здесь,
      // чтобы блок характеристик читал все значения из одного места.
      unity: 'Unity',
      upstreamUnmodified: 'upstream, unmodified',
      rendererUi: 'renderer + UI',
      inDevelopment: 'in development',
      notPublicYet: 'not public yet',
      noneYet: 'none yet',
    },
    devlogLine: { before: 'Progress gets written up in the ', link: 'devlog', after: '.' },
    screenshotsHeading: 'Screenshots',
    openFullSize: 'Open full size',
  },

  shots: {
    screen__01: {
      caption: 'third-person camera',
      alt:
        'Third-person view of a stone dungeon corridor on Dungeon:1. The character panel, ' +
        'minimap and inventory run down the right edge; the message log sits along the bottom.',
    },
    screen__02: {
      caption: 'shallow water, staircase',
      alt:
        'The character standing in shallow water beside a staircase, with the message log ' +
        'reporting the terrain underfoot.',
    },
    screen__03: {
      caption: 'top-down camera',
      alt:
        'Top-down view of a dungeon level with monsters and items marked on the floor, and ' +
        'an encounter warning highlighted in the message log.',
    },
    screen__04: {
      caption: 'monster description — game text, monospace',
      alt:
        'A monster description panel for a bat opened over the 3D view, set in the same ' +
        'monospace the game itself uses.',
    },
    screen__05: {
      caption: 'foxfire',
      alt: 'A Djinni magician casting Foxfire, two glowing orbs lighting the surrounding stone.',
    },
  },

  devlog: {
    title: 'Devlog',
    description: 'Development notes on building a 3D client for Dungeon Crawl Stone Soup.',
    lead: 'Notes on what got built and what broke. No schedule.',
    empty: 'nothing published yet — the commit history is the honest version of events',
    englishOnly: 'Entries are written in English.',
    back: 'devlog',
    draftNote: 'draft — excluded from the build',
  },

  credits: {
    title: 'Credits',
    description: 'The game, the tools and the typefaces this project is built on.',
    lead:
      "This project is a renderer attached to someone else's game. The list below is " +
      'who did the rest.',
    groups: {
      game: {
        title: 'The game',
        lead:
          'Everything you actually play — rules, mechanics, balance, dungeon generation, ' +
          'monster behaviour, every line of item and spell text — comes from upstream ' +
          'and is not modified here.',
      },
      builtWith: { title: 'Built with' },
      typefaces: {
        title: 'Typefaces',
        lead:
          'Both are the same files the client interface uses, subset and served from ' +
          'this domain — no font is fetched from anywhere else.',
      },
      hosting: { title: 'Hosting' },
    },
    notes: {
      unity: 'engine and renderer for the client',
      astro: 'this site',
      tailwind: 'styles',
      ffmpeg: 'the clip and the screenshots',
      iosevka: 'anything the machine says',
      manrope: 'anything we say',
      pages: 'static files, nothing running on a server',
    },
    licences: {
      before: 'Font licences are kept in the site repository under ',
      after:
        ', as the SIL Open Font License requires when the files are redistributed.',
    },
  },

  notFound: {
    title: 'Not found',
    heading: 'There is nothing here',
    body: 'The address does not match any page on this site.',
    home: 'Back to the front page',
  },
};

/** Форма словаря. Любой язык обязан повторить её целиком. */
export type Strings = typeof en;

const ru: Strings = {
  meta: {
    title: 'DCSS 3D — 3D-клиент для Dungeon Crawl Stone Soup',
    description:
      'Рендер и интерфейс на Unity для Dungeon Crawl Stone Soup. Вся игровая логика ' +
      'остаётся в оригинале, здесь делаются только отрисовка и интерфейс. ' +
      'Хобби, открытый исходный код.',
    ogImageAlt:
      'Клиент DCSS 3D: каменное подземелье в 3D, по краям — панель персонажа, ' +
      'мини-карта и журнал сообщений.',
  },

  chrome: {
    skipToContent: 'Перейти к содержимому',
    navDevlog: 'Devlog',
    languageLabel: 'Язык',
    footerUpstream: {
      before: 'Сама игра — правила, содержание и два десятилетия работы — это ',
      after: ', сделанная своей командой. Этот проект её только отрисовывает.',
    },
    footerCredits: 'Источники — игра, инструменты, шрифты',
    footerSiteSource: 'исходники сайта',
    footerNoTrackers: 'без трекеров и сторонних запросов',
  },

  home: {
    heading: '3D-клиент для Dungeon Crawl Stone Soup',
    subheading:
      'Рендер и интерфейс на Unity поверх оригинальной игры. Правила остаются ровно ' +
      'там, где были.',
    heroLabel:
      'Запись игры: камера идёт над каменным подземельем, рядом обновляются панель ' +
      'персонажа, мини-карта и журнал сообщений.',
    sections: [
      {
        title: 'Что приходит из оригинала',
        body:
          'Вся игровая логика остаётся в оригинале: механики, баланс, генерация ' +
          'подземелий, поведение монстров, тексты. Двадцать лет работы, которые ' +
          'невозможно воспроизвести в одиночку — да и незачем. Игра здесь не ' +
          'форкается, и то, как в неё играют, не меняется.',
      },
      {
        title: 'Что делается здесь',
        body:
          'Только рендер и интерфейс — то, чего игре не хватает, и то, что отпугивает ' +
          'новых игроков раньше, чем они дойдут до остального. Принцип — асимметрия ' +
          'вклада: не переписывать игру, а приложить к ней ту единственную часть, ' +
          'которой недостаёт. Это хобби, и оно ни с чем не конкурирует.',
      },
      {
        title: 'Проверка, которую проходит каждое изменение',
        body:
          'Видно ли по-прежнему не хуже, чем в оригинале? DCSS информационно плотная: ' +
          'одного взгляда хватает понять, кто где стоит, что видно, что только ' +
          'помнишь и кто опасен. Красивая 3D-картинка легко передаёт меньше, чем сетка ' +
          'символов. Если стало красивее, а играть хуже — провалено ровно то, ради ' +
          'чего всё затевалось.',
      },
    ],
    specKeys: {
      engine: 'движок',
      gameLogic: 'игровая логика',
      builtHere: 'сделано здесь',
      status: 'статус',
      clientSource: 'исходники клиента',
      builds: 'сборки',
    },
    specValues: {
      unity: 'Unity',
      upstreamUnmodified: 'оригинал, без изменений',
      rendererUi: 'рендер + интерфейс',
      inDevelopment: 'в разработке',
      notPublicYet: 'пока закрыты',
      noneYet: 'пока нет',
    },
    devlogLine: { before: 'О ходе работы пишется в ', link: 'devlog', after: '.' },
    screenshotsHeading: 'Скриншоты',
    openFullSize: 'Открыть в полном размере',
  },

  shots: {
    screen__01: {
      caption: 'камера от третьего лица',
      alt:
        'Вид от третьего лица на каменный коридор подземелья, Dungeon:1. По правому ' +
        'краю — панель персонажа, мини-карта и инвентарь, снизу — журнал сообщений.',
    },
    screen__02: {
      caption: 'мелководье, лестница',
      alt:
        'Персонаж стоит на мелководье рядом с лестницей, журнал сообщений сообщает ' +
        'о характере местности под ногами.',
    },
    screen__03: {
      caption: 'камера сверху',
      alt:
        'Вид сверху на уровень подземелья: на полу отмечены монстры и предметы, ' +
        'в журнале сообщений выделено предупреждение о встрече.',
    },
    screen__04: {
      caption: 'описание монстра — игровой текст, моноширинный',
      alt:
        'Панель описания летучей мыши поверх трёхмерного вида, набранная тем же ' +
        'моноширинным шрифтом, каким пользуется сама игра.',
    },
    screen__05: {
      caption: 'foxfire',
      alt:
        'Маг-джинн применяет Foxfire, два светящихся шара освещают окружающий камень.',
    },
  },

  devlog: {
    title: 'Devlog',
    description: 'Заметки о разработке 3D-клиента для Dungeon Crawl Stone Soup.',
    lead: 'Заметки о том, что сделано и что сломалось. Без расписания.',
    empty: 'пока ничего не опубликовано — честная версия событий лежит в истории коммитов',
    englishOnly: 'Записи пишутся по-английски.',
    back: 'devlog',
    draftNote: 'черновик — не попадёт в сборку',
  },

  credits: {
    title: 'Источники',
    description: 'Игра, инструменты и шрифты, на которых стоит этот проект.',
    lead:
      'Этот проект — рендер, приложенный к чужой игре. Ниже те, кто сделал всё ' +
      'остальное.',
    groups: {
      game: {
        title: 'Игра',
        lead:
          'Всё, во что вы на самом деле играете, — правила, механики, баланс, ' +
          'генерация подземелий, поведение монстров, каждая строка описаний ' +
          'предметов и заклинаний — приходит из оригинала и здесь не меняется.',
      },
      builtWith: { title: 'Собрано на' },
      typefaces: {
        title: 'Шрифты',
        lead:
          'Оба — те же файлы, которыми набран интерфейс клиента; подрезаны и ' +
          'отдаются с этого домена, ни один шрифт не запрашивается со стороны.',
      },
      hosting: { title: 'Хостинг' },
    },
    notes: {
      unity: 'движок и рендер клиента',
      astro: 'этот сайт',
      tailwind: 'стили',
      ffmpeg: 'видео и скриншоты',
      iosevka: 'всё, что говорит машина',
      manrope: 'всё, что говорим мы',
      pages: 'статические файлы, на сервере ничего не работает',
    },
    licences: {
      before: 'Лицензии шрифтов лежат в репозитории сайта, в ',
      after:
        ' — этого требует SIL Open Font License при распространении файлов.',
    },
  },

  notFound: {
    title: 'Страница не найдена',
    heading: 'Здесь ничего нет',
    body: 'Адрес не соответствует ни одной странице этого сайта.',
    home: 'На главную',
  },
};

const de: Strings = {
  meta: {
    title: 'DCSS 3D — ein 3D-Client für Dungeon Crawl Stone Soup',
    description:
      'Rendering und Oberfläche in Unity für Dungeon Crawl Stone Soup. Die gesamte ' +
      'Spiellogik bleibt beim Original; hier entstehen nur Darstellung und Interface. ' +
      'Hobbyprojekt, quelloffen.',
    ogImageAlt:
      'Der DCSS-3D-Client: ein steinernes Verlies in 3D, an den Rändern Charakterpanel, ' +
      'Übersichtskarte und Nachrichtenprotokoll.',
  },

  chrome: {
    skipToContent: 'Zum Inhalt springen',
    navDevlog: 'Devlog',
    languageLabel: 'Sprache',
    footerUpstream: {
      before: 'Das Spiel selbst — Regeln, Inhalte und zwei Jahrzehnte Arbeit — ist ',
      after: ', von seinem eigenen Team. Dieses Projekt stellt es lediglich dar.',
    },
    footerCredits: 'Credits — das Spiel, die Werkzeuge, die Schriften',
    footerSiteSource: 'Quellcode der Website',
    footerNoTrackers: 'keine Tracker, keine Anfragen an Dritte',
  },

  home: {
    heading: 'Ein 3D-Client für Dungeon Crawl Stone Soup',
    subheading:
      'Rendering und Oberfläche in Unity, aufgesetzt auf das Originalspiel. Die Regeln ' +
      'bleiben genau dort, wo sie sind.',
    heroLabel:
      'Spielaufnahme: Die Kamera fährt über eine steinerne Verliesebene, während ' +
      'Charakterpanel, Übersichtskarte und Nachrichtenprotokoll mitlaufen.',
    sections: [
      {
        title: 'Was aus dem Original kommt',
        body:
          'Die gesamte Spiellogik bleibt beim Original: Mechaniken, Balance, ' +
          'Verliesgenerierung, Monsterverhalten, die Texte. Zwanzig Jahre Arbeit, die ' +
          'eine einzelne Person nicht nachbauen kann — und auch nicht muss. Hier wird ' +
          'das Spiel weder geforkt noch darin verändert, wie es sich spielt.',
      },
      {
        title: 'Was hier gebaut wird',
        body:
          'Nur Rendering und Oberfläche — genau der Teil, der dem Spiel fehlt, und genau ' +
          'der, an dem neue Spieler scheitern, bevor sie zu allem anderen kommen. Das ' +
          'Prinzip ist die Asymmetrie des Beitrags: das Spiel nicht neu schreiben, ' +
          'sondern ihm das eine fehlende Stück anfügen. Ein Hobbyprojekt, das mit nichts ' +
          'konkurriert.',
      },
      {
        title: 'Der Test, den jede Änderung bestehen muss',
        body:
          'Ist es immer noch so gut ablesbar wie das Original? DCSS ist informationsdicht: ' +
          'Ein Blick genügt, um zu sehen, wer wo steht, was sichtbar ist, was nur noch ' +
          'erinnert wird und was gefährlich ist. Ein 3D-Bild transportiert leicht weniger ' +
          'als ein Raster aus Zeichen. Sieht es besser aus und spielt sich schlechter, ist ' +
          'genau das Ziel verfehlt, um dessentwillen alles begann.',
      },
    ],
    specKeys: {
      engine: 'Engine',
      gameLogic: 'Spiellogik',
      builtHere: 'hier gebaut',
      status: 'Status',
      clientSource: 'Client-Quellcode',
      builds: 'Builds',
    },
    specValues: {
      unity: 'Unity',
      upstreamUnmodified: 'Original, unverändert',
      rendererUi: 'Rendering + Oberfläche',
      inDevelopment: 'in Entwicklung',
      notPublicYet: 'noch nicht öffentlich',
      noneYet: 'noch keine',
    },
    devlogLine: { before: 'Der Fortschritt wird im ', link: 'Devlog', after: ' festgehalten.' },
    screenshotsHeading: 'Screenshots',
    openFullSize: 'In voller Größe öffnen',
  },

  shots: {
    screen__01: {
      caption: 'Third-Person-Kamera',
      alt:
        'Third-Person-Ansicht eines steinernen Verliesgangs auf Dungeon:1. Am rechten ' +
        'Rand Charakterpanel, Übersichtskarte und Inventar, unten das Nachrichtenprotokoll.',
    },
    screen__02: {
      caption: 'flaches Wasser, Treppe',
      alt:
        'Die Spielfigur steht in flachem Wasser neben einer Treppe; das ' +
        'Nachrichtenprotokoll meldet den Untergrund.',
    },
    screen__03: {
      caption: 'Kamera von oben',
      alt:
        'Draufsicht auf eine Verliesebene mit Monstern und Gegenständen auf dem Boden; ' +
        'im Nachrichtenprotokoll ist eine Warnung vor einer Begegnung hervorgehoben.',
    },
    screen__04: {
      caption: 'Monsterbeschreibung — Spieltext, dicktengleich',
      alt:
        'Ein Beschreibungsfenster zu einer Fledermaus über der 3D-Ansicht, gesetzt in ' +
        'derselben dicktengleichen Schrift, die das Spiel selbst verwendet.',
    },
    screen__05: {
      caption: 'foxfire',
      alt:
        'Ein Dschinn-Magier wirkt Foxfire; zwei leuchtende Kugeln erhellen den ' +
        'umliegenden Stein.',
    },
  },

  devlog: {
    title: 'Devlog',
    description: 'Entwicklungsnotizen zum Bau eines 3D-Clients für Dungeon Crawl Stone Soup.',
    lead: 'Notizen darüber, was gebaut wurde und was kaputtging. Ohne Zeitplan.',
    empty:
      'noch nichts veröffentlicht — die ehrliche Fassung der Ereignisse steht in der ' +
      'Commit-Historie',
    englishOnly: 'Die Einträge sind auf Englisch verfasst.',
    back: 'Devlog',
    draftNote: 'Entwurf — nicht im Build enthalten',
  },

  credits: {
    title: 'Credits',
    description: 'Das Spiel, die Werkzeuge und die Schriften, auf denen dieses Projekt steht.',
    lead:
      'Dieses Projekt ist ein Renderer, der an das Spiel anderer angesetzt ist. Unten ' +
      'stehen die, die alles Übrige gemacht haben.',
    groups: {
      game: {
        title: 'Das Spiel',
        lead:
          'Alles, was man tatsächlich spielt — Regeln, Mechaniken, Balance, ' +
          'Verliesgenerierung, Monsterverhalten, jede Zeile Gegenstands- und Zaubertext — ' +
          'kommt aus dem Original und wird hier nicht verändert.',
      },
      builtWith: { title: 'Gebaut mit' },
      typefaces: {
        title: 'Schriften',
        lead:
          'Beide sind dieselben Dateien, die auch die Oberfläche des Clients verwendet: ' +
          'reduziert und von dieser Domain ausgeliefert — keine Schrift wird anderswo ' +
          'geladen.',
      },
      hosting: { title: 'Hosting' },
    },
    notes: {
      unity: 'Engine und Rendering des Clients',
      astro: 'diese Website',
      tailwind: 'Styles',
      ffmpeg: 'Videoclip und Screenshots',
      iosevka: 'alles, was die Maschine sagt',
      manrope: 'alles, was wir sagen',
      pages: 'statische Dateien, auf dem Server läuft nichts',
    },
    licences: {
      before: 'Die Schriftlizenzen liegen im Repository der Website unter ',
      after:
        ', wie es die SIL Open Font License bei der Weitergabe der Dateien verlangt.',
    },
  },

  notFound: {
    title: 'Nicht gefunden',
    heading: 'Hier ist nichts',
    body: 'Die Adresse gehört zu keiner Seite dieser Website.',
    home: 'Zurück zur Startseite',
  },
};

const es: Strings = {
  meta: {
    title: 'DCSS 3D — un cliente 3D para Dungeon Crawl Stone Soup',
    description:
      'Renderizado e interfaz en Unity para Dungeon Crawl Stone Soup. Toda la lógica ' +
      'del juego permanece en el original; aquí solo se construyen la representación y ' +
      'la interfaz. Proyecto de afición, código abierto.',
    ogImageAlt:
      'El cliente DCSS 3D: una mazmorra de piedra renderizada en 3D, con el panel del ' +
      'personaje, el minimapa y el registro de mensajes en los bordes.',
  },

  chrome: {
    skipToContent: 'Saltar al contenido',
    navDevlog: 'Devlog',
    languageLabel: 'Idioma',
    footerUpstream: {
      before: 'El juego en sí —reglas, contenido y dos décadas de trabajo— es ',
      after: ', de su propio equipo. Este proyecto solo lo representa.',
    },
    footerCredits: 'Créditos: el juego, las herramientas, las tipografías',
    footerSiteSource: 'código del sitio',
    footerNoTrackers: 'sin rastreadores ni peticiones a terceros',
  },

  home: {
    heading: 'Un cliente 3D para Dungeon Crawl Stone Soup',
    subheading:
      'Renderizado e interfaz en Unity sobre el juego original. Las reglas se quedan ' +
      'exactamente donde están.',
    heroLabel:
      'Grabación de partida: la cámara recorre un nivel de mazmorra de piedra mientras ' +
      'se actualizan el panel del personaje, el minimapa y el registro de mensajes.',
    sections: [
      {
        title: 'Lo que viene del original',
        body:
          'Toda la lógica del juego permanece en el original: mecánicas, balance, ' +
          'generación de mazmorras, comportamiento de los monstruos, los textos. Veinte ' +
          'años de trabajo que una sola persona no puede reproducir, ni tiene por qué. ' +
          'Aquí no se bifurca el juego ni se cambia cómo se juega.',
      },
      {
        title: 'Lo que se construye aquí',
        body:
          'Solo el renderizado y la interfaz: la parte que le falta al juego y la que ' +
          'aleja a los jugadores nuevos antes de que lleguen a nada más. El principio es ' +
          'la asimetría de la contribución: no reescribir el juego, sino añadirle la ' +
          'única pieza que le falta. Es un proyecto de afición y no compite con nada.',
      },
      {
        title: 'La prueba que debe pasar cada cambio',
        body:
          '¿Se sigue leyendo igual de bien que el original? DCSS es densa en información: ' +
          'una mirada basta para saber quién está dónde, qué se ve, qué solo se recuerda ' +
          'y qué es peligroso. Una imagen 3D transmite con facilidad menos que una ' +
          'rejilla de glifos. Si se ve mejor y se juega peor, ha fallado justo en aquello ' +
          'para lo que existía.',
      },
    ],
    specKeys: {
      engine: 'motor',
      gameLogic: 'lógica del juego',
      builtHere: 'hecho aquí',
      status: 'estado',
      clientSource: 'código del cliente',
      builds: 'builds',
    },
    specValues: {
      unity: 'Unity',
      upstreamUnmodified: 'original, sin modificar',
      rendererUi: 'renderizado + interfaz',
      inDevelopment: 'en desarrollo',
      notPublicYet: 'aún no público',
      noneYet: 'aún ninguna',
    },
    devlogLine: { before: 'El progreso se documenta en el ', link: 'devlog', after: '.' },
    screenshotsHeading: 'Capturas',
    openFullSize: 'Abrir a tamaño completo',
  },

  shots: {
    screen__01: {
      caption: 'cámara en tercera persona',
      alt:
        'Vista en tercera persona de un pasillo de mazmorra de piedra en Dungeon:1. El ' +
        'panel del personaje, el minimapa y el inventario ocupan el borde derecho; el ' +
        'registro de mensajes va abajo.',
    },
    screen__02: {
      caption: 'agua poco profunda, escalera',
      alt:
        'El personaje de pie en agua poco profunda junto a una escalera, con el registro ' +
        'de mensajes informando del terreno bajo sus pies.',
    },
    screen__03: {
      caption: 'cámara cenital',
      alt:
        'Vista cenital de un nivel de mazmorra con monstruos y objetos marcados en el ' +
        'suelo, y un aviso de encuentro resaltado en el registro de mensajes.',
    },
    screen__04: {
      caption: 'descripción de monstruo — texto del juego, monoespaciado',
      alt:
        'Un panel de descripción de un murciélago abierto sobre la vista 3D, compuesto ' +
        'en la misma tipografía monoespaciada que usa el propio juego.',
    },
    screen__05: {
      caption: 'foxfire',
      alt:
        'Un mago djinni lanzando Foxfire; dos orbes luminosos iluminan la piedra de ' +
        'alrededor.',
    },
  },

  devlog: {
    title: 'Devlog',
    description:
      'Notas de desarrollo sobre la construcción de un cliente 3D para Dungeon Crawl ' +
      'Stone Soup.',
    lead: 'Notas sobre lo que se ha construido y lo que se ha roto. Sin calendario.',
    empty:
      'aún no hay nada publicado — la versión honesta de los hechos está en el historial ' +
      'de commits',
    englishOnly: 'Las entradas están escritas en inglés.',
    back: 'devlog',
    draftNote: 'borrador — excluido de la compilación',
  },

  credits: {
    title: 'Créditos',
    description: 'El juego, las herramientas y las tipografías sobre las que se apoya este proyecto.',
    lead:
      'Este proyecto es un renderizador acoplado al juego de otras personas. Abajo están ' +
      'quienes hicieron todo lo demás.',
    groups: {
      game: {
        title: 'El juego',
        lead:
          'Todo lo que de verdad se juega —reglas, mecánicas, balance, generación de ' +
          'mazmorras, comportamiento de los monstruos, cada línea de texto de objetos y ' +
          'hechizos— viene del original y aquí no se modifica.',
      },
      builtWith: { title: 'Construido con' },
      typefaces: {
        title: 'Tipografías',
        lead:
          'Ambas son los mismos archivos que usa la interfaz del cliente, reducidas y ' +
          'servidas desde este dominio: ninguna tipografía se descarga de fuera.',
      },
      hosting: { title: 'Alojamiento' },
    },
    notes: {
      unity: 'motor y renderizado del cliente',
      astro: 'este sitio',
      tailwind: 'estilos',
      ffmpeg: 'el vídeo y las capturas',
      iosevka: 'todo lo que dice la máquina',
      manrope: 'todo lo que decimos nosotros',
      pages: 'archivos estáticos, nada corriendo en un servidor',
    },
    licences: {
      before: 'Las licencias de las tipografías están en el repositorio del sitio, en ',
      after:
        ', como exige la SIL Open Font License al redistribuir los archivos.',
    },
  },

  notFound: {
    title: 'No encontrado',
    heading: 'Aquí no hay nada',
    body: 'La dirección no corresponde a ninguna página de este sitio.',
    home: 'Volver a la portada',
  },
};

export const ui = { en, ru, de, es };
