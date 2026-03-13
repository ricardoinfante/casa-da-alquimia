#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMG_DIR="$ROOT_DIR/public/img"

if [[ ! -d "$IMG_DIR" ]]; then
  echo "Diretório não encontrado: $IMG_DIR"
  exit 1
fi

echo "Iniciando otimização de mídias em: $IMG_DIR"

# JPEG/JPG: resize condicional + remoção de metadados + compressão
while IFS= read -r -d '' file; do
  tmp_file="${file}.tmp.jpg"
  convert "$file" -auto-orient -resize '2048x2048>' -strip -interlace Plane -quality 82 "$tmp_file"
  if [[ -s "$tmp_file" ]]; then
    mv "$tmp_file" "$file"
    echo "JPEG otimizado: $file"
  else
    rm -f "$tmp_file"
  fi
done < <(find "$IMG_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

# PNG: resize condicional + remoção de metadados + compressão lossless
while IFS= read -r -d '' file; do
  tmp_file="${file}.tmp.png"
  convert "$file" -auto-orient -resize '2048x2048>' -strip \
    -define png:compression-level=9 \
    -define png:compression-strategy=1 \
    -define png:compression-filter=5 \
    "$tmp_file"
  if [[ -s "$tmp_file" ]]; then
    mv "$tmp_file" "$file"
    echo "PNG otimizado: $file"
  else
    rm -f "$tmp_file"
  fi
done < <(find "$IMG_DIR" -type f \( -iname '*.png' \) -print0)

# MP4: recompressão para web
while IFS= read -r -d '' file; do
  tmp_file="${file}.tmp.mp4"
  ffmpeg -y -i "$file" -vf "scale='min(1920,iw)':-2" -c:v libx264 -preset medium -crf 28 -movflags +faststart -c:a aac -b:a 96k "$tmp_file" >/dev/null 2>&1 || {
    rm -f "$tmp_file"
    continue
  }
  if [[ -s "$tmp_file" ]]; then
    mv "$tmp_file" "$file"
    echo "MP4 otimizado: $file"
  else
    rm -f "$tmp_file"
  fi
done < <(find "$IMG_DIR" -type f \( -iname '*.mp4' \) -print0)

echo "Otimização concluída."
