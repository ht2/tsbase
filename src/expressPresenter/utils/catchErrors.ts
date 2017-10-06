import { v4 as uuid } from 'uuid';
import BaseError from '../../errors/BaseError';
import Config from '../Config';
import handleError from '../utils/handleError';
import Handler from '../utils/Handler';

export default (config: Config, handler: Handler): Handler => {
  const translator = config.translator;
  const logger = config.logger;

  return async (req, res) => {
    return handler(req, res).catch((err: {} | Error | BaseError) => {
      const errorId = uuid();
      logger.error(errorId, err);
      handleError({ translator, errorId, res, err });
    });
  };
};
