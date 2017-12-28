import NoModel from '../../errors/NoModel';
import { Opts, Result } from '../../repoFactory/models/RemoveSignature';
import Model from '../../utils/Model';
import Config from './Config';

export default <R>({ getModels, setModels, modelName }: Config<R>) => {
  return async ({ id }: Opts): Promise<Result> => {
    const prevModels = getModels();
    const predicate = (model: Model<R>) => model.id === id;
    const unmatchedModels = prevModels.filter((model) => !predicate(model));

    if (unmatchedModels.length === prevModels.length) {
      throw new NoModel(modelName);
    }

    setModels(unmatchedModels);
  };
};
