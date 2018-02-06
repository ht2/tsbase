import { delay } from 'bluebird';
import Config from './Config';
import Connection from './Connection';
import createConnection from './createConnection';

export default async (config: Config, retries: number): Promise<Connection> => {
  if (retries > config.maxRetries) {
    throw new Error('Too many retries');
  }
  config.logger.info(`Starting retry ${retries} in ${config.retryGapMS}ms`);
  await Promise.resolve(delay(config.retryGapMS));
  return createConnection(config, retries);
};
