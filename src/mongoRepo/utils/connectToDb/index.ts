import { Db } from 'mongodb';
import { LoggerInstance } from 'winston';
import Config from './Config';
import Connection from './Connection';
import getConnection from './getConnection';

export interface Opts {
  readonly maxRetries?: number;
  readonly retryGapMS?: number;
  readonly logger: LoggerInstance;
  readonly url: string;
  readonly dbName: string;
}

const defaultMaxRetries = 3;
const defaultRetryGapMS = 1000;

export default ({
  maxRetries = defaultMaxRetries,
  retryGapMS = defaultRetryGapMS,
  logger,
  url,
  dbName,
}: Opts) => {
  let connection: Promise<Connection>; // tslint:disable-line:no-let
  const setConnection = (newConnection: Promise<Connection>) => {
    connection = newConnection;
  };
  const config: Config = { maxRetries, retryGapMS, logger, url, dbName, setConnection };
  const connectToDb = async (): Promise<Db> => {
    setConnection(getConnection(config, connection));
    return (await connection).db;
  };
  connectToDb().catch((err) => {
    logger.error(`Failed initial mongo connection: ${err.message}`);
  });
  return connectToDb;
};
