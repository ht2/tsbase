/* tslint:disable no-invalid-this no-this max-file-line-count */
import { QueryBuilder } from 'knex';
import { isObject } from 'lodash';
import InvalidOp from '../../errors/InvalidOp';

export type QueryOp = (props: string[], expected: any, query: QueryBuilder) => QueryBuilder;

interface ComparisonOpts {
  readonly op: string;
  readonly props: string[];
  readonly value: any;
  readonly query: QueryBuilder;
}

const prop = (props: string[]): string =>
  props.join('.');

const comparisionOp = ({ op, props, value, query }: ComparisonOpts): QueryBuilder => {
  return query.where(prop(props), op, value);
};

const exists: QueryOp = (props, expected, query) => {
  return (
    expected === true ?
      query.whereNotNull(prop(props)) :
      query.whereNull(prop(props))
  );
};

const contains: QueryOp = (props, expected, query) => {
  return query.whereIn(prop(props), expected);
};

const nin: QueryOp = (props, expected, query) => {
  return query.whereNotIn(prop(props), expected);
};

const conditionsOp = (operation: QueryOp): QueryOp => {
  return (props, conditions: any[], query) => {
    return query.where(function (this: QueryBuilder) {
      conditions.forEach((condition) => {
        return operation(props, condition, this);
      });
    });
  };
};

const or: QueryOp = conditionsOp((props, condition, query) => {
  return query.orWhere(function (this: QueryBuilder) {
    match(props, condition, this);
  });
});

const and: QueryOp = conditionsOp((props, condition, query) => {
  return match(props, condition, query);
});

const not: QueryOp = (props, condition, query) => {
  return query.whereNot(function (this: QueryBuilder) {
    match(props, condition, this);
  });
};

const nor: QueryOp = (props, conditions: any[], query) => {
  return query.whereNot(function (this: QueryBuilder) {
    conditions.forEach((condition: any) => {
      // tslint:disable-next-line no-shadowed-variable
      this.orWhere(function (this: QueryBuilder) {
        match(props, condition, this);
      });
    });
  });
};

const matchKey = (props: string[], key: string, value: any, query: QueryBuilder) => {
  switch (key) {
    case '$eq': case '=':
      return comparisionOp({ op: '=', props, value, query });
    case '$ne': case '!=':
      return comparisionOp({ op: '!=', props, value, query });
    case '$gt': case '>':
      return comparisionOp({ op: '>', props, value, query });
    case '$gte': case '>=':
      return comparisionOp({ op: '>=', props, value, query });
    case '$lt': case '<':
      return comparisionOp({ op: '<', props, value, query });
    case '$lte': case '<=':
      return comparisionOp({ op: '<=', props, value, query });
    case '$regex': case '~':
      return comparisionOp({ op: 'REGEXP', props, value, query });
    case '$in':
      return contains(props, value, query);
    case '$nin':
      return nin(props, value, query);
    case '$or':
      return or(props, value, query);
    case '$and':
      return and(props, value, query);
    case '$not':
      return not(props, value, query);
    case '$nor':
      return nor(props, value, query);
    case '$exists':
      return exists(props, value, query);
    default:
      if (key[0] === '$') {
        throw new InvalidOp(key);
      }
      if (isObject(value)) {
        return match([...props, key], value, query);
      }
      return comparisionOp({ op: '=', props: [...props, key], value, query });
  }
};

const matchKeys = (keys: string[]): QueryOp => {
  return (props, filter, query) => {
    return keys.reduce((result: QueryBuilder, key: string) => {
      return matchKey(props, key, filter[key], result);
    }, query);
  };
};

const match: QueryOp = (props, filter, query) => {
  return matchKeys(Object.keys(filter))(props, filter, query);
};

export default match;
