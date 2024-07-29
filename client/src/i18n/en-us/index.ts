import login from './login';
import common from './common';
import connection from './connection';
import knowledge from './knowledge';

export default {
  ...login,
  ...common,
  ...connection,
  ...knowledge
};
