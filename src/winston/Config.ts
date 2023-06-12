interface Config {
  readonly console: {
    readonly level: string;
  };
  readonly cloudWatch: {
    readonly level: string;
    readonly enabled: boolean;
    readonly logGroupName: string;
    readonly logStreamName: string;
    readonly awsConfig: {
      readonly accessKeyId?: string;
      readonly secretAccessKey?: string;
      readonly region: string;
    };
  };
}

export default Config;
