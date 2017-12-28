import Model from '../../utils/Model';

interface Config<R> {
  readonly getModels: () => Model<R>[];
  readonly setModels: (models: Model<R>[]) => void;
  readonly modelName: string;
}

export default Config;
