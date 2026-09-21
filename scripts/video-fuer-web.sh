#!/usr/bin/env bash
# Rechnet ein Hero-Video fuer den Web-Einsatz klein und macht daraus eine
# nahtlose Schleife: vorwaerts, dann rueckwaerts. Dadurch endet der Clip genau
# dort, wo er anfaengt - kein Sprung beim Neustart.
#   scripts/video-fuer-web.sh <quelle.mp4> [breite]
# Ergebnis: public/video/hero.mp4, public/video/hero.webm, public/arbeiten/hero-standbild.jpg
set -euo pipefail
QUELLE="$1"
BREITE="${2:-1152}"
ZIEL="public/video"
mkdir -p "$ZIEL"

PING="[0:v]scale=${BREITE}:-2:flags=lanczos,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]"

ffmpeg -y -hide_banner -loglevel error -i "$QUELLE" \
  -filter_complex "$PING" -map "[v]" -an \
  -c:v libx264 -profile:v high -crf 29 -preset slow -pix_fmt yuv420p \
  -movflags +faststart "$ZIEL/hero.mp4"

ffmpeg -y -hide_banner -loglevel error -i "$QUELLE" \
  -filter_complex "$PING" -map "[v]" -an \
  -c:v libvpx-vp9 -crf 43 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
  "$ZIEL/hero.webm"

# Standbild = erstes Bild des Clips, damit der Uebergang vom Bild zum Video nicht springt
ffmpeg -y -hide_banner -loglevel error -i "$QUELLE" -frames:v 1 \
  -vf "scale=1600:-2:flags=lanczos" -q:v 3 "public/arbeiten/hero-standbild.jpg"

for f in "$ZIEL/hero.mp4" "$ZIEL/hero.webm" "public/arbeiten/hero-standbild.jpg"; do
  printf '%s  %s  %s\n' "$f" "$(du -h "$f" | cut -f1)" \
    "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of csv=p=0 "$f")"
done
