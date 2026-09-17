import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const isDomainReady = config.getBoolean("domainReady") ?? false;

const certificate = new aws.acm.Certificate("site", {
  domainName: "pivatto.dev",
  subjectAlternativeNames: ["www.pivatto.dev"],
  validationMethod: "DNS",
});

const certificateValidation = isDomainReady
  ? new aws.acm.CertificateValidation("site", { certificateArn: certificate.arn })
  : undefined;

const bucket = new aws.s3.BucketV2("site", {
  tags: { Project: "portfolio" },
});

new aws.s3.BucketPublicAccessBlock("site", {
  bucket: bucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
});

const originAccess = new aws.cloudfront.OriginAccessControl("site", {
  name: "pivatto-portfolio",
  originAccessControlOriginType: "s3",
  signingBehavior: "always",
  signingProtocol: "sigv4",
});

const distribution = new aws.cloudfront.Distribution("site", {
  enabled: true,
  isIpv6Enabled: true,
  aliases: isDomainReady ? ["pivatto.dev", "www.pivatto.dev"] : [],
  defaultRootObject: "index.html",
  origins: [{
    domainName: bucket.bucketRegionalDomainName,
    originId: "private-s3",
    originAccessControlId: originAccess.id,
    s3OriginConfig: { originAccessIdentity: "" },
  }],
  defaultCacheBehavior: {
    targetOriginId: "private-s3",
    viewerProtocolPolicy: "redirect-to-https",
    allowedMethods: ["GET", "HEAD"],
    cachedMethods: ["GET", "HEAD"],
    compress: true,
    cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
  },
  restrictions: { geoRestriction: { restrictionType: "none" } },
  viewerCertificate: certificateValidation
    ? {
        acmCertificateArn: certificateValidation.certificateArn,
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021",
      }
    : { cloudfrontDefaultCertificate: true },
  tags: { Project: "portfolio" },
});

new aws.s3.BucketPolicy("cloudfront", {
  bucket: bucket.id,
  policy: pulumi.all([bucket.arn, distribution.arn]).apply(([bucketArn, distributionArn]) => JSON.stringify({
    Version: "2012-10-17",
    Statement: [{
      Sid: "AllowCloudFrontRead",
      Effect: "Allow",
      Principal: { Service: "cloudfront.amazonaws.com" },
      Action: "s3:GetObject",
      Resource: `${bucketArn}/*`,
      Condition: { StringEquals: { "AWS:SourceArn": distributionArn } },
    }],
  })),
});

export const certificateValidationRecords = certificate.domainValidationOptions.apply(options =>
  options.map(option => ({
    domain: option.domainName,
    name: option.resourceRecordName,
    type: option.resourceRecordType,
    value: option.resourceRecordValue,
  })),
);
export const bucketName = bucket.bucket;
export const distributionId = distribution.id;
export const distributionDomain = distribution.domainName;
export const siteDomain = isDomainReady ? "pivatto.dev" : distribution.domainName;
