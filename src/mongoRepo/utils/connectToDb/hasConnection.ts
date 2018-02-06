import * as mongodb from 'mongodb'; // tslint:disable-line:no-unused
import Config from './Config';
import Connection from './Connection';

export default async (config: Config, connection: Promise<Connection> | undefined) => {
  if (connection === undefined) {
    return false;
  }
  try {
    const { client } = await connection;
    return client.isConnected(config.dbName);
  } catch (err) {
    return false;
  }
};
