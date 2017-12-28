import * as btoa from 'btoa';
import { get, set } from 'lodash';
import Cursor from '../../../utils/Cursor';
import Model from '../../../utils/Model';
import Sort from '../../../utils/Sort';

export default <R>(model: Model<R>, sort: Sort<R>): Cursor => {
  const sortKeys = Object.keys(sort);
  const cursorResult = sortKeys.reduce<Partial<Model<R>>>((result, sortKey) => {
    return set(result, sortKey, get(model, sortKey));
  }, {});
  return btoa(JSON.stringify(cursorResult));
};
