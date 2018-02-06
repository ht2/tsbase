import { LoggerInstance } from 'winston';
import Connection from './Connection';

export default interface Config {
  readonly maxRetries: number;
  readonly retryGapMS: number;
  readonly logger: LoggerInstance;
  readonly url: string;
  readonly dbName: string;
  readonly setConnection: (connection: Promise<Connection>) => void;
}
