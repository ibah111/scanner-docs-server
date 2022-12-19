import { Op } from '@contact/sequelize';
type Result = Record<symbol, boolean | Result[]>;
export default function DateCol(operator: string, value: string) {
  const result: Result = {};
  switch (operator) {
    case 'is':
      if (value) result[Op.is] = value === 'true';
      if (!value) {
        result[Op.or] = [{ [Op.is]: true }, { [Op.is]: false }];
      }
      break;
  }
  return result;
}
