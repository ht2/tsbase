import { Response } from 'express';
import { Warnings } from 'rulr';
import Forbidden from '../../errors/Forbidden';
import InvalidAuth from '../../errors/InvalidAuth';
import NoModel from '../../errors/NoModel';
import Unauthorised from '../../errors/Unauthorised';
import Config from '../Config';
import sendMessage from '../utils/sendMessage';
import sendObject from '../utils/sendObject';
import translateWarning from '../utils/translateWarning';

export interface Options {
  readonly config: Config;
  readonly errorId: string;
  readonly res: Response;
  readonly err: any;
}

export default ({ config, errorId, res, err }: Options): Response => {
  const { translator, logger } = config;
  const logError = (msg: string, meta?: any) => {
    logger.error(`${errorId}: jscommons handled - ${msg}`, meta);
  };
  if (err instanceof InvalidAuth) {
    const code = 400;
    const message = translator.invalidAuthError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Warnings) {
    const code = 400;
    const warnings = err.warnings;
    const strWarnings = warnings.map((warning) => {
      return translateWarning(translator, warning);
    });
    const obj = { warnings: strWarnings };
    return sendObject({ res, code, errorId, obj });
  }
  if (err instanceof NoModel) {
    const code = 404;
    const message = translator.noModelError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Unauthorised) {
    const code = 401;
    const message = translator.unauthorisedError(err);
    return sendMessage({ res, code, errorId, message });
  }
  if (err instanceof Forbidden) {
    const code = 403;
    const message = translator.forbiddenError(err);
    return sendMessage({ res, code, errorId, message });
  }
  {
    const code = 500;
    const message = translator.serverError();
    logError(message, err);
    return sendMessage({ res, code, errorId, message });
  }
};
