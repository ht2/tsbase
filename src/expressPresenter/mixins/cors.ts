import * as cors from 'cors';
import { RequestHandler } from 'express';

export default (): RequestHandler => {
  return cors({
    credentials: true,
    origin: true,
    preflightContinue: true,
    exposedHeaders: ['ETag'],
  });
};
