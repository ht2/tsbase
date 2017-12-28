import { orderBy } from 'lodash';
import Model from '../../../utils/Model';
import Sort from '../../../utils/Sort';

export default <R>(models: Model<R>[], sort: Sort<R>): Model<R>[] => {
  const sortKeys = Object.keys(sort);
  const sortDirections = sortKeys.map((sortKey) => {
    const sortAscending = (sort as any)[sortKey] as boolean;
    return sortAscending ? 'asc' : 'desc';
  });
  return orderBy(models, sortKeys, sortDirections);
};
