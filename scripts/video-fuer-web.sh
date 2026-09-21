#!/usr/bin/env bash
# Rechnet ein Hero-Video fuer den Web-Einsatz klein.
#   scripts/video-fuer-web.sh <quelle.mp4>
# Ergebnis: public/video/hero.mp4 und public/video/hero.webm
set -euo pipefail
QUELLE="$1"
ZIEL="public/video"
mkdir -p "$ZIEL"

# Hochformat, Hoehe auf 1280 begrenzt - mehr braucht die Hero-Spalte nicht.
# Kein Ton: das Video laeuft stumm und in Schleife.
ffmpeg -y -hide_banner -loglevel error -i "$QUELLE" \
  -vf "scale=-2:1280:flags=lanczos" -an \
  -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$ZIEL/hero.mp4"

ffmpeg -y -hide_banner -loglevel error -i "$QUELLE" \
  -vf "scale=-2:1280:flags=lanczos" -an \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  "$ZIEL/hero.webm"

for f in "$ZIEL/hero.mp4" "$ZIEL/hero.webm"; do
  printf '%s  %s  %s\n' "$f" "$(du -h "$f" | cut -f1)" \
    "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "$f")"
done
