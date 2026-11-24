#!/usr/bin/env bash
# Historical library-runtime proxy, NOT a full Next/Nuxt bundle benchmark.
set -euo pipefail
bench_dir=$(mktemp -d)
curl -fsSL https://unpkg.com/react@18.3.1/umd/react.production.min.js -o "$bench_dir/react.js"
curl -fsSL https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js -o "$bench_dir/react-dom.js"
curl -fsSL https://unpkg.com/vue@3.4.0/dist/vue.runtime.global.prod.js -o "$bench_dir/vue.js"
for task_file in "$bench_dir/react.js" "$bench_dir/react-dom.js" "$bench_dir/vue.js"; do
  printf '%s raw=' "$task_file"
  wc -c < "$task_file"
  printf 'gzip9-n='
  gzip -n -9 -c "$task_file" | wc -c
done
printf 'Temporary measurements retained in %s\n' "$bench_dir"
