import * as atob from 'atob';
import { get } from 'lodash';
import Model from '../../../utils/Model';
import Pagination from '../../../utils/Pagination';
import Sort from '../../../utils/Sort';

const xor = (conditionA: boolean, conditionB: boolean) => {
  return (conditionA && !conditionB) || (!conditionA && conditionB);
};

export default <R>(pagination: Pagination, sort: Sort<R>) => {
  if (pagination.cursor === undefined) {
    return [];
  }
  const cursorObj: Partial<Model<R>> = JSON.parse(atob(pagination.cursor));
  const filters = Object.keys(sort).map((sortKey) => {
    const forward = !xor(get(sort, sortKey), pagination.forward);
    const cursorValue = get(cursorObj, sortKey);
    return (model: Model<R>) => {
      const modelValue = get(model, sortKey);
      if (forward) {
        return modelValue > cursorValue;
      } else {
        return modelValue < cursorValue;
      }
    };
  });
  return filters;
};
