import { includes, isNull, isObject, isUndefined } from 'lodash';
import InvalidOp from '../../errors/InvalidOp';

type Op = (actual: any) => boolean;

const or = (conditions: Op[]): Op => (actual) =>
  (
    match(conditions[0])(actual) ||
    (conditions.length > 1 ? or(conditions.slice(1))(actual) : false)
  );

const and = (conditions: Op[]): Op => (actual) =>
  (
    match(conditions[0])(actual) &&
    (conditions.length > 1 ? and(conditions.slice(1))(actual) : true)
  );

const not = (condition: any): Op => (actual) =>
  !match(condition)(actual);

const nor = (conditions: any[]): Op => (actual) =>
  (
    not(conditions[0])(actual) &&
    (conditions.length > 1 ? nor(conditions.slice(1))(actual) : true)
  );

const matchKey = (key: string, value: any) => (actual: any) => {
  switch (key) {
    case '$eq': case '=':
      return actual === value;
    case '$ne': case '!=':
      return actual !== value;
    case '$gt': case '>':
      return actual > value;
    case '$gte': case '>=':
      return actual >= value;
    case '$lt': case '<':
      return actual < value;
    case '$lte': case '<=':
      return actual <= value;
    case '$regex': case '~':
      return (new RegExp(value)).test(actual);
    case '$in':
      return includes(value, actual);
    case '$nin':
      return !includes(value, actual);
    case '$or':
      return or(value)(actual);
    case '$and':
      return and(value)(actual);
    case '$not':
      return not(value)(actual);
    case '$nor':
      return nor(value)(actual);
    case '$exists':
      return !(isNull(actual) || isUndefined(actual)) === value;
    default:
      if (key[0] === '$') {
        throw new InvalidOp(key);
      }
      if (isObject(value)) {
        return match(value)(actual[key]);
      }
      return actual[key] === value;
  }
};

const matchKeys = (keys: string[], filter: any): Op =>
  (actual: any) => {
    return keys.length === 0 || (
      matchKey(keys[0], filter[keys[0]])(actual) &&
      (keys.length > 1 ? matchKeys(keys.slice(1), filter)(actual) : true)
    );
  };

const match = (filter: any): Op =>
  (actual: any) => {
    return matchKeys(Object.keys(filter), filter)(actual);
  };

export default match;
