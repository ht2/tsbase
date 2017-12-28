import Idable from './Idable';

type Entity<Record extends Object> = Record & Idable;

export default Entity;
