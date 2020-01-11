import DiscoDao from '../../model/Disco';
import logger from '../../utils/logger';

const requestBodyValidation = requestBody => {
  const { id } = requestBody;
  switch (true) {
    case !id:
      logger.warn(' PUT request received without id ');
      return false;
    case isNaN(id):
      logger.warn(' PUT request received with NaN id ');
      return false;
    default:
      return true;
  }
};

const main = (request, response) => {
  if (requestBodyValidation(request.body)) {
    const { id } = request.body;
    const discoDao = new DiscoDao();
    discoDao
      .deleteDisco(id)
      .then(() => {
        logger.info('Register delete from Database');
        response.status(200).send();
      })
      .catch(error => {
        logger.error(error);
        response.status(500).json({
          error: 500,
          message:
            'Internal Server Error - Please contact the system administrator',
        });
      });
  } else {
    response.status(400).json({
      error: 400,
      message: 'Error while processing request body',
    });
  }
};

export default {
  route: '/disco/delete',
  main,
};
