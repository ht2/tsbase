import { first } from 'lodash';
import NoModel from '../../errors/NoModel';
import { Opts, Result } from '../../repoFactory/models/OverwriteSignature';
import Model from '../../utils/Model';
import Config from './Config';

export default <R>({ getModels, setModels, modelName }: Config<R>) => {
  return async ({ id, record }: Opts<R>): Promise<Result<R>> => {
    const prevModels = getModels();
    const predicate = (model: Model<R>) => model.id === id;
    const matchedModels = prevModels.filter(predicate);
    const overwrittenModels = matchedModels.map(() => {
      return {
        ...(record as any as object),
        id,
      } as Model<R>;
    });
    const overwrittenModel = first(overwrittenModels);

    if (overwrittenModel === undefined) {
      throw new NoModel(modelName);
    }

    const unmatchedModels = prevModels.filter((model) => !predicate(model));
    const nextModels = [...unmatchedModels, ...overwrittenModels];
    setModels(nextModels);
    return { model: overwrittenModel };
  };
};
