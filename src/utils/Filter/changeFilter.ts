import { GridFilterModel } from '@mui/x-data-grid-premium';

export function changeFilter(filter: GridFilterModel) {
  const result: GridFilterModel = {
    items: [...filter.items],
    linkOperator: filter.linkOperator,
  };

  result.items.push({
    columnField: 'docs',
    operatorValue: 'is',
    value: 'true',
  });
  return result;
}
