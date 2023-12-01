import { GridColDefExtend } from './GridColDefExtndsClass';

export default function getFieldHandler(
  columnModel: GridColDefExtend[],
  modelName?: string,
) {
  const filter = columnModel.filter((item) =>
    modelName ? item.modelName === modelName : true,
  );
  return (name: string) => filter.find((column) => column.field === name);
}
