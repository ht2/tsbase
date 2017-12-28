import { v4 as uuid } from 'uuid';
import { Opts, Result } from '../../repoFactory/models/CreateSignature';
import Model from '../../utils/Model';
import Config from './Config';

export default <R>({ getModels, setModels }: Config<R>) => {
  return async ({ records }: Opts<R>): Promise<Result<R>> => {
    const prevModels = getModels();
    const newModels = records.map((record): Model<R> => {
      return {
        ...(record as any as object),
        id: uuid(),
      } as Model<R>;
    });
    const nextModels = [...prevModels, ...newModels];
    setModels(nextModels);
    return { models: newModels };
  };
};
