import Member from '../../utils/Member';
import Model from '../../utils/Model';

export interface Opts<R> {
  readonly records: R[];
}

export interface Result<R> {
  readonly models: Model<R>[];
}

type Signature<R> = Member<Opts<R>, Result<R>>;

export default Signature;
