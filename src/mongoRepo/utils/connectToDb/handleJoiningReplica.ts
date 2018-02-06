import Config from './Config';

export default (config: Config) => (role: string, server: any) => {
  config.logger.info(`A ${role} server joined the replica set`, server.me);
};
