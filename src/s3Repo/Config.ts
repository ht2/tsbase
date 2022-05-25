import { S3 } from '@aws-sdk/client-s3';
interface Config {
  readonly client: S3;
  readonly bucketName: string;
  readonly subFolder: string;
}

export default Config;
