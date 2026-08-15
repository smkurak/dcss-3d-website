#!/usr/bin/env python3
"""
Собирает веб-шрифты для сайта: сабсеттинг TTF -> woff2 в public/fonts/.

Зачем скрипт, а не разовая конвертация: шрифты в клиенте меняются
(Intel One Mono -> Iosevka Charon, см. style-guide.md), и пересобрать
веб-версию нужно одной командой, а не вспоминать флаги pyftsubset.

Требования:  pip install fonttools brotli
Запуск:      python scripts/build-fonts.py

Источники:
  fonts/IosevkaCharonMono-Regular.ttf  — ровно тот файл, что лежит в Unity-проекте
  vendor/Manrope[wght].ttf             — вариативная Manrope v4.504 (та же версия,
                                         что статический Regular в клиенте), нужна
                                         ради начертаний 500/700 для заголовков
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

# Базовый латинский диапазон (тот же, что отдаёт Google Fonts для subset=latin).
LATIN = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,"
    "U+2212,U+2215,U+FEFF,U+FFFD"
)

# Моноширинному добавляем то, чем набирают технический текст: стрелки,
# псевдографику, галочки. Сайт про терминальную игру — это пригодится
# в devlog и в таблицах релизов.
MONO_EXTRA = "U+2190-21FF,U+2500-257F,U+25A0-25FF,U+2713-2717,U+00B7,U+2026"

JOBS = [
    {
        "src": ROOT / "fonts" / "IosevkaCharonMono-Regular.ttf",
        "out": OUT / "iosevka-charon-mono-400.woff2",
        "unicodes": LATIN + "," + MONO_EXTRA,
        "flags": [],
    },
    {
        "src": ROOT / "vendor" / "Manrope[wght].ttf",
        "out": OUT / "manrope-var.woff2",
        "unicodes": LATIN,
        # Вариативную ось wght оставляем целиком: одним файлом получаем
        # и 400 для текста, и 500/700 для заголовков.
        "flags": [],
    },
]


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    failed = False

    for job in JOBS:
        src, out = job["src"], job["out"]
        if not src.exists():
            print(f"!! нет исходника: {src.relative_to(ROOT)}", file=sys.stderr)
            failed = True
            continue

        cmd = [
            sys.executable, "-m", "fontTools.subset", str(src),
            f"--unicodes={job['unicodes']}",
            f"--output-file={out}",
            "--flavor=woff2",
            "--layout-features=kern,liga,clig,calt,tnum,frac",
            "--name-IDs=0,1,2,3,4,5,6",   # оставить имя/версию/лицензию, выкинуть остальное
            "--drop-tables+=DSIG",
            "--desubroutinize",
        ] + job["flags"]

        subprocess.run(cmd, check=True)
        before = src.stat().st_size / 1024
        after = out.stat().st_size / 1024
        print(f"   {src.name:38s} {before:8.1f} KB -> {out.name:30s} {after:7.1f} KB")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
