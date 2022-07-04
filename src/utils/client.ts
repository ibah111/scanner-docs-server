import config from 'src/config/client.json';
export default (name) => {
  return config[name];
};
