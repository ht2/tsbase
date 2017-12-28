import Id from '../../utils/Id';
import Member from '../../utils/Member';
import Model from '../../utils/Model';

export interface Opts<R> {
  readonly id: Id;
  readonly record: R;
}

export interface Result<R> {
  readonly model: Model<R>;
}

type Signature<R> = Member<Opts<R>, Result<R>>;

export default Signature;
