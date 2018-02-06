import Config from './Config';
import Connection from './Connection';
import createConnection from './createConnection';
import hasConnection from './hasConnection';

export default async (
  config: Config,
  existingConnection?: Promise<Connection>,
): Promise<Connection> => {
  const isConnected = await hasConnection(config, existingConnection);
  if (!isConnected) {
    return createConnection(config);
  }
  return existingConnection as Promise<Connection>;
};
