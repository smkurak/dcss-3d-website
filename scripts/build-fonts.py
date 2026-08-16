#!/usr/bin/env python3
"""
Собирает веб-шрифты для сайта: сабсеттинг TTF -> woff2 в src/assets/fonts/.

Зачем скрипт, а не разовая конвертация: шрифты в клиенте меняются
(Intel One Mono -> Iosevka Charon, см. style-guide.md), языков на сайте
становится больше, и пересобрать веб-версию нужно одной командой.

Требования:  pip install fonttools brotli
Запуск:      python scripts/build-fonts.py

--- Про разбиение на подмножества -------------------------------------------

Каждая гарнитура режется не на один файл, а на четыре: latin, latin-ext,
cyrillic, cyrillic-ext. В CSS они объявлены отдельными @font-face с
дескриптором unicode-range, и браузер качает только те, чьи символы реально
встретились на странице.

Смысл: английская страница не платит за кириллицу, русская — за то, что нужно
только польскому или сербскому. Один общий файл со всеми алфавитами весил бы
столько же, сколько сумма, но качался бы целиком и всегда.

Порядок такой же, каким пользуется Google Fonts, — диапазоны взяты оттуда,
чтобы не изобретать своё разбиение.
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Шрифты кладём в src/assets, а не в public/: Vite обрабатывает url() в CSS,
# сам подставляет base и добавляет хеш к имени. Файл из public/ пришлось бы
# звать абсолютным "/fonts/...", и на GitHub Pages с подпутём /REPO/ он бы
# не нашёлся. См. README, раздел про base.
OUT = ROOT / "src" / "assets" / "fonts"

# Диапазоны символов. Значения совпадают с тем, что отдаёт Google Fonts,
# и должны совпадать с unicode-range в src/styles/global.css — иначе браузер
# либо не скачает нужный файл, либо скачает лишний.
SUBSETS = {
    "latin": (
        "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
        "U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,"
        "U+2212,U+2215,U+FEFF,U+FFFD"
    ),
    "latin-ext": (
        "U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,"
        "U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"
    ),
    "cyrillic": "U+0301,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116",
    "cyrillic-ext": (
        "U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F"
    ),
}

# Моноширинному в latin добавляем то, чем набирают технический текст: стрелки,
# псевдографику, галочки. Сайт про терминальную игру — это нужно в devlog
# и в таблицах независимо от языка страницы.
MONO_EXTRA = "U+2190-21FF,U+2500-257F,U+25A0-25FF,U+2713-2717,U+00B7,U+2026"

FAMILIES = [
    {
        "src": ROOT / "fonts" / "IosevkaCharonMono-Regular.ttf",
        "stem": "iosevka-charon-mono-400",
        "extra": {"latin": MONO_EXTRA},
    },
    {
        # Вариативная ось wght остаётся целиком: одним файлом на подмножество
        # получаем и 400 для текста, и 600 для заголовков.
        "src": ROOT / "vendor" / "Manrope[wght].ttf",
        "stem": "manrope-var",
        "extra": {},
    },
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    failed = False
    total_before = 0
    total_after = 0

    for family in FAMILIES:
        src = family["src"]
        if not src.exists():
            print(f"!! нет исходника: {src.relative_to(ROOT)}", file=sys.stderr)
            failed = True
            continue

        before = src.stat().st_size / 1024
        total_before += before
        print(f"{src.name}  ({before:.0f} КБ)")

        for subset, ranges in SUBSETS.items():
            unicodes = ranges
            if subset in family["extra"]:
                unicodes += "," + family["extra"][subset]

            out = OUT / f"{family['stem']}-{subset}.woff2"

            subprocess.run(
                [
                    sys.executable, "-m", "fontTools.subset", str(src),
                    f"--unicodes={unicodes}",
                    f"--output-file={out}",
                    "--flavor=woff2",
                    "--layout-features=kern,liga,clig,calt,tnum,frac",
                    "--name-IDs=0,1,2,3,4,5,6",
                    "--drop-tables+=DSIG",
                    "--desubroutinize",
                ],
                check=True,
            )

            after = out.stat().st_size / 1024
            total_after += after
            print(f"    {subset:14s} -> {out.name:44s} {after:7.1f} КБ")

    print(f"\n  исходники {total_before:.0f} КБ  ->  веб-шрифты {total_after:.0f} КБ")
    print("  (страница качает только те подмножества, символы которых на ней есть)")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
