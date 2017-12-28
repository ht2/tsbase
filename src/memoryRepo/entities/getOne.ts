import { first } from 'lodash';
import NoModel from '../../errors/NoModel';
import { Opts, Result } from '../../repoFactory/models/GetOneSignature';
import Model from '../../utils/Model';
import Config from './Config';

export default <R>({ getModels, modelName }: Config<R>) => {
  return async ({ id }: Opts): Promise<Result<R>> => {
    const storedModels = getModels();
    const predicate = (model: Model<R>) => model.id === id;
    const matchedModels = storedModels.filter(predicate);
    const matchedModel = first(matchedModels);
    if (matchedModel === undefined) {
      throw new NoModel(modelName);
    }
    return { model: matchedModel };
  };
};
