import { S3Client } from '@aws-sdk/client-s3';
interface Config {
  readonly client: S3Client;
  readonly bucketName: string;
  readonly subFolder: string;
}

export default Config;
