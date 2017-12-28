import { Opts, Result } from '../../repoFactory/models/CountSignature';
import Config from './Config';
import matchModels from './utils/matchModels';

export default <R>({ getModels }: Config<R>) => {
  return async ({ match }: Opts<R>): Promise<Result> => {
    const storedModels = getModels();
    const matchedModels = matchModels(storedModels, match);
    const count = matchedModels.length;
    return { count };
  };
};
