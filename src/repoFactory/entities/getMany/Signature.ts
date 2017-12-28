import Cursor from '../../utils/Cursor';
import Match from '../../utils/Match';
import Member from '../../utils/Member';
import Model from '../../utils/Model';
import Pagination from '../../utils/Pagination';
import Sort from '../../utils/Sort';

export interface Opts<R> {
  readonly match: Match<R>;
  readonly sort: Sort<R>;
  readonly pagination: Pagination;
}

export interface Result<R> {
  readonly models: Model<R>[];
  readonly forwardCursor: Cursor;
  readonly backwardCursor: Cursor;
}

type Signature<R> = Member<Opts<R>, Result<R>>;

export default Signature;
