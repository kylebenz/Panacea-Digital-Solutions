#!/usr/bin/env bash
# Restart the local production server on $PORT (default 3100).
PORT="${PORT:-3100}"
for pid in $(pgrep next-server); do kill "$pid" 2>/dev/null; done
sleep 1
FORM_WEBHOOK_URL="${FORM_WEBHOOK_URL:-dry-run}" nohup npx next start -p "$PORT" > "${SERVER_LOG:-/dev/null}" 2>&1 &
for _ in $(seq 1 60); do
  curl -s -o /dev/null "http://localhost:$PORT/" && exit 0
  sleep 0.5
done
echo "server did not start" >&2; exit 1
