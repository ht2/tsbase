import { first } from 'lodash';
import NoModel from '../../errors/NoModel';
import { Opts, Result } from '../../repoFactory/models/PatchSignature';
import Model from '../../utils/Model';
import Config from './Config';

export default <R>({ getModels, setModels, modelName }: Config<R>) => {
  return async ({ id, patch }: Opts<R>): Promise<Result<R>> => {
    const prevModels = getModels();
    const predicate = (model: Model<R>) => model.id === id;
    const matchedModels = prevModels.filter(predicate);
    const patchedModels = matchedModels.map((model) => {
      return {
        ...(model as any as object),
        ...(patch as any as object),
        id,
      } as Model<R>;
    });
    const patchedModel = first(patchedModels);

    if (patchedModel === undefined) {
      throw new NoModel(modelName);
    }

    const unmatchedModels = prevModels.filter((model) => !predicate(model));
    const nextModels = [...unmatchedModels, ...patchedModels];
    setModels(nextModels);
    return { model: patchedModel };
  };
};
