import Match from '../../utils/Match';
import Member from '../../utils/Member';

export interface Opts<R> {
  readonly match: Match<R>;
}

export interface Result {
  readonly count: number;
}

type Signature<R> = Member<Opts<R>, Result>;

export default Signature;
