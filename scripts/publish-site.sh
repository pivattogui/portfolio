#!/usr/bin/env bash
set -euo pipefail

bucket_name="$1"
distribution_id="$2"

aws s3 sync dist/assets/ "s3://${bucket_name}/assets/" \
  --cache-control 'public,max-age=31536000,immutable'

aws s3 sync dist/ "s3://${bucket_name}/" \
  --exclude 'assets/*' --exclude 'index.html' --delete \
  --cache-control 'public,max-age=300'

aws s3 cp dist/index.html "s3://${bucket_name}/index.html" \
  --cache-control 'no-cache' --content-type 'text/html; charset=utf-8'

invalidation_id="$(aws cloudfront create-invalidation \
  --distribution-id "$distribution_id" --paths '/*' \
  --query 'Invalidation.Id' --output text)"
aws cloudfront wait invalidation-completed \
  --distribution-id "$distribution_id" --id "$invalidation_id"
