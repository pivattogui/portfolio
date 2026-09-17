# AWS hosting

The `portfolio-site` Pulumi stack owns only resources used to serve this website: an ACM certificate, a private S3 bucket, a CloudFront distribution with Origin Access Control, and the bucket access policy. Cloudflare manages DNS. The stack does not create account-wide IAM or GitHub identity resources.

## GitHub Actions credentials

Set these repository secrets before pushing the deployment workflow to `main`:

| Secret | Purpose |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | AWS identity permitted to manage ACM, S3, and CloudFront and upload site files |
| `AWS_SECRET_ACCESS_KEY` | Secret key for that identity |
| `PULUMI_ACCESS_TOKEN` | Pulumi Cloud token with access to the site stack |

Set `PULUMI_ORG` as a repository variable with the individual Pulumi Cloud username. The workflow selects or creates `<PULUMI_ORG>/portfolio-site/production`. AWS credentials are available only to its infrastructure and publication steps. The PR workflow runs code checks without cloud credentials.

The AWS identity and its permissions are managed outside this repository. This stack uses `us-east-1`, which CloudFront requires for its ACM certificate.

## First publication

1. Push the infrastructure and workflow to `main`. The deployment runs `npm ci`, typecheck, lint, and build, then creates the stack, certificate, private bucket, and CloudFront distribution. It publishes `dist/` and checks the default CloudFront domain over HTTPS.
2. Read `certificateValidationRecords` in the deployment log. Add the CNAME records to Cloudflare as **DNS only**. Keep them for certificate renewal. Wait for ACM to issue the certificate.
3. Change `portfolio-site:domainReady` to `true` in `infra/site/Pulumi.production.yaml` and push the change. The deployment attaches `pivatto.dev` and `www.pivatto.dev` to CloudFront, publishes the site, and checks both names over HTTPS through the distribution before DNS changes.
4. Remove conflicting records for `@` and `www` in Cloudflare, then add **DNS only** CNAME records pointing both names to the `distributionDomain` output. Cloudflare flattens the apex CNAME. The existing site can remain in place until this step.

Both names serve the same site. There is no redirect from `www` to the apex. The distribution uses standard CloudFront usage pricing; this stack does not enroll it in a flat-rate plan.

## Updates

Every PR runs application and infrastructure typechecks, lint, and build. Every push to `main` repeats those checks, applies the Pulumi stack, publishes hashed assets without deleting older versions, uploads `index.html` last, invalidates CloudFront, and checks the deployed site. Revert a broken commit and push the revert to publish the previous build.
