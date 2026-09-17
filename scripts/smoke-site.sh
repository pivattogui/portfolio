#!/usr/bin/env bash
set -euo pipefail

distribution_domain="$1"
site_domain="$2"

curl --fail --silent --show-error --retry 5 --retry-delay 3 \
  --connect-to "${site_domain}:443:${distribution_domain}:443" \
  "https://${site_domain}/" | grep -q '<title>Guilherme Pivatto'

asset_path="$(grep -oE '/assets/[^" ]+' dist/index.html | sed -n '1p')"
test -n "$asset_path"
curl --fail --silent --show-error --retry 5 --retry-delay 3 \
  --connect-to "${site_domain}:443:${distribution_domain}:443" \
  "https://${site_domain}${asset_path}" --output /dev/null

curl --fail --silent --show-error --retry 5 --retry-delay 3 \
  --connect-to "${site_domain}:443:${distribution_domain}:443" \
  "https://${site_domain}/favicon.svg" | grep -q '<svg'

if [[ "$site_domain" == 'pivatto.dev' ]]; then
  curl --fail --silent --show-error --retry 5 --retry-delay 3 \
    --connect-to "www.pivatto.dev:443:${distribution_domain}:443" \
    https://www.pivatto.dev/ | grep -q '<title>Guilherme Pivatto'
fi
