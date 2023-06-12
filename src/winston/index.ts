import * as moment from 'moment';
import * as winston from 'winston';
import * as CloudWatchTransport from 'winston-cloudwatch';
import Config from './Config';

const getTime = () => moment().format('YYYY-MM-DD HH:mm:ss:SSS');

const createConsoleTransport = (config: Config): winston.transport => new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: getTime,
    }),
    winston.format.prettyPrint()
  ),
  handleExceptions: true,
  level: config.console.level,
  stderrLevels: ['error'],
});

const createAwsTransport = (config: Config): winston.transport => new CloudWatchTransport({
  ...(config.cloudWatch.awsConfig.accessKeyId && config.cloudWatch.awsConfig.secretAccessKey ? {
    awsAccessKeyId: config.cloudWatch.awsConfig.accessKeyId,
    awsSecretKey: config.cloudWatch.awsConfig.secretAccessKey,
  } : {}),
  awsRegion: config.cloudWatch.awsConfig.region,
  logGroupName: config.cloudWatch.logGroupName,
  logStreamName: config.cloudWatch.logStreamName,
  level: config.cloudWatch.level,
});

export default (config: Config) => winston.createLogger({
  exitOnError: false,
  format: winston.format.json(),
  transports: [
    createConsoleTransport(config),
    ...(!config.cloudWatch.enabled ? [] : [createAwsTransport(config)]),
  ],
});
