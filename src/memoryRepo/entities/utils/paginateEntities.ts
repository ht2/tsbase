import { take, takeRight, takeWhile } from 'lodash';
import Model from '../../../utils/Model';
import Pagination from '../../../utils/Pagination';
import Sort from '../../../utils/Sort';
import getPaginationFilters from './getPaginationFilters';

export default <R>(models: Model<R>[], pagination: Pagination, sort: Sort<R>): Model<R>[] => {
  const filters = getPaginationFilters(pagination, sort);
  const matchedModels = models.filter((model) => {
    const matchedFilters = takeWhile(filters, (filter) => {
      return filter(model);
    });
    return matchedFilters.length === filters.length;
  });
  if (pagination.forward) {
    return take(matchedModels, pagination.limit);
  } else {
    return takeRight(matchedModels, pagination.limit);
  }
};
