import * as cors from 'cors';
import { RequestHandler } from 'express';

export default (): RequestHandler => {
  return cors({
    credentials: true,
    exposedHeaders: ['ETag'],
    origin: true,
    preflightContinue: true,
  });
};
