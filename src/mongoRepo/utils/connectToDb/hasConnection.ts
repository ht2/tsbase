import * as mongodb from 'mongodb'; // tslint:disable-line:no-unused
import Connection from './Connection';

export default async (connection: Promise<Connection> | undefined) => {
  if (connection === undefined) {
    return false;
  }
  try {
    const { client } = await connection;
    return client.isConnected;
  } catch (err) {
    return false;
  }
};
