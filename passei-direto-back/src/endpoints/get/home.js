import logger from '../../utils/logger';

const main = (request, response) => {
  logger.info('Environment: ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    logger.info('MYSQL_HOST:', process.env.MYSQL_HOST);
    logger.info('MYSQL_PORT:', process.env.MYSQL_PORT);
    logger.info('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
    logger.info('MYSQL_USER:', process.env.MYSQL_USER);
    logger.info('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
  }

  response.status(200).send(`Passei Direto API is up!`);
};

export default {
  route: '/',
  main,
};
