import { first } from 'lodash';
import Cursor from '../../../utils/Cursor';
import Model from '../../../utils/Model';
import Sort from '../../../utils/Sort';
import getCursorFromModel from './getCursorFromModel';

export default <R>(models: Model<R>[], sort: Sort<R>): Cursor => {
  const model = first(models);
  if (model === undefined) {
    return undefined;
  }
  return getCursorFromModel(model, sort);
};
