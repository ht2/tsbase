import { MongoClient } from 'mongodb';
import Config from './Config';
import Connection from './Connection';
import retryConnection from './retryConnection';

export default async (config: Config, retries = 0): Promise<Connection> => {
  try {
    const client = await MongoClient.connect(config.url);
    const db = client.db(config.dbName);

    config.logger.info(`Created new Mongo connection`);

    return { client, db };
  } catch (error: any) {
    config.logger.error(`Failed Mongo connection: ${error.message}`);

    return retryConnection(config, retries + 1);
  }
};
