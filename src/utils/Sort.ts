import Model from './Model';

type Sort<Record extends Object> = {
  readonly [P in keyof Model<Record>]: boolean | undefined;
};

export default Sort;
