#!/usr/bin/env bash
set -euo pipefail

npm run rebuild
npm pack

GEN_DIR="$(pwd)"
TMP_HOME=~/.chinjto

mkdir -p $TMP_HOME
TMP_DIR="$(mktemp -d $TMP_HOME/gen-angular-XXXXXX)"

echo "Project: $TMP_DIR"

cd "$TMP_DIR"

printf "Use toolbox-shell? [Y/n] "
read -r ANSWER

case "$ANSWER" in
        n|N|no|NO)
            echo "Using plain Angular CLI..."
            printf "Project name: "
            read -r PROJECT_NAME
            ng new $PROJECT_NAME \
                --directory . \
                --routing \
                --style=scss \
                --standalone \
                --skip-git \
                --package-manager=npm
                --zoneless
            ;;
        *)
            echo "Using toolbox-shell..."
            zsh -ic 'init angular'
            ;;
esac

npm install -D $GEN_DIR/*.tgz
ng add @chinjto/generator-angular

if [[ "${1:-}" == "--idea" ]]; then
  zsh -ic 'idea .'
fi
