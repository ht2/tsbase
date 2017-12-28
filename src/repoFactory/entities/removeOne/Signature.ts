import Id from '../../utils/Id';
import Member from '../../utils/Member';

export interface Opts {
  readonly id: Id;
}

export type Result = void;

type Signature = Member<Opts, Result>;

export default Signature;
