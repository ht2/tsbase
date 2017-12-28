import Id from '../../utils/Id';
import Member from '../../utils/Member';
import Model from '../../utils/Model';

export interface Opts {
  readonly id: Id;
}

export interface Result<R> {
  readonly model: Model<R>;
}

type Signature<R> = Member<Opts, Result<R>>;

export default Signature;
