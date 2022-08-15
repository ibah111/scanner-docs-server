import { Op } from '@contact/sequelize';

export default function StringCol(operator: string, value: string) {
  const result = {};
  switch (operator) {
    case 'contains':
      result[Op.substring] = `${value}`;
      break;
    case 'equals':
      result[Op.eq] = value;
      break;
    case 'startsWith':
      result[Op.startsWith] = value;
      break;
    case 'endsWith':
      result[Op.endsWith] = value;
      break;
    case 'isEmpty':
      result[Op.is] = null;
      break;
    case 'isNotEmpty':
      result[Op.not] = null;
      break;
    case 'isAnyOf':
      result[Op.in] = value;
      break;
  }
  return result;
}
