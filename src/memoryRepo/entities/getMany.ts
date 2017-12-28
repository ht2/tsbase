import { Opts, Result } from '../../repoFactory/models/GetManySignature';
import Config from './Config';
import getBackwardCursor from './utils/getBackwardCursor';
import getForwardCursor from './utils/getForwardCursor';
import matchModels from './utils/matchModels';
import paginateModels from './utils/paginateModels';
import sortModels from './utils/sortModels';

export default <R>({ getModels }: Config<R>) => {
  return async ({ match, sort, pagination }: Opts<R>): Promise<Result<R>> => {
    const storedModels = getModels();
    const matchedModels = matchModels(storedModels, match);
    const sortedModels = sortModels(matchedModels, sort);
    const models = paginateModels(sortedModels, pagination, sort);
    const forwardCursor = getForwardCursor(models, sort);
    const backwardCursor = getBackwardCursor(models, sort);
    return { models, forwardCursor, backwardCursor };
  };
};
