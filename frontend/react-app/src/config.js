import env from './env.js';

const config = {
  apiUrl: env.API_URL,
  debug: env.DEBUG,
  databaseUrl: env.DATABASE_URL,
  mysqlRootPassword: env.MYSQL_ROOT_PASSWORD,
  mysqlDatabase: env.MYSQL_DATABASE
};

export default config;