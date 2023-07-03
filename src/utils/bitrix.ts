import config from '../config/bitrix.json';
export default (name = 'server') => {
  switch (name) {
    case 'token':
    case 'oauth':
    case 'token_structure':
      return config[name];
    default:
      return config.server;
  }
};
