import { Op } from '@contact/sequelize';

export default function NumericCol(operator: string, value: string) {
  const result = {};
  switch (operator) {
    case 'equals':
      result[Op.eq] = value;
      break;
    case '!=':
      result[Op.not] = value;
      break;
    case '>':
      result[Op.gt] = value;
      break;
    case '>=':
      result[Op.gte] = value;
      break;
    case '<':
      result[Op.lt] = value;
      break;
    case '<=':
      result[Op.lte] = value;
      break;
    case 'isEmpty':
      result[Op.is] = null;
      break;
    case 'isNotEmpty':
      result[Op.not] = null;
      break;
    case 'contains':
      result[Op.substring] = value;
      break;
  }
  return result;
}
