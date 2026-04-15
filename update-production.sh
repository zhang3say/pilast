#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_NAME="${PM2_APP_NAME:-pilast}"
BRANCH="${1:-main}"

log() {
  printf '\n[%s] %s\n' "$(date '+%F %T')" "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_clean_worktree() {
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "Working tree is not clean. Commit or stash changes before updating." >&2
    git status --short
    exit 1
  fi
}

sync_standalone_assets() {
  mkdir -p .next/standalone/.next
  rsync -a --delete public/ .next/standalone/public/
  rsync -a --delete .next/static/ .next/standalone/.next/static/
}

main() {
  require_command git
  require_command pnpm
  require_command pm2
  require_command rsync

  cd "$ROOT_DIR"

  log "Checking git worktree"
  require_clean_worktree

  log "Fetching latest code"
  git fetch origin
  git checkout "$BRANCH"
  git pull --rebase origin "$BRANCH"

  log "Installing dependencies"
  pnpm install --frozen-lockfile

  log "Building application"
  pnpm build

  log "Syncing standalone assets"
  sync_standalone_assets

  log "Reloading PM2 process"
  pm2 startOrRestart ecosystem.config.cjs --env production
  pm2 save

  log "Current PM2 status"
  pm2 status "$APP_NAME"

  log "Update completed successfully"
}

main "$@"
