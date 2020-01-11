import DiscoDao from '../../model/Disco';
import logger from '../../utils/logger';

const requestBodyValidation = requestBody => {
  switch (true) {
    case !requestBody.page:
      logger.warn(' POST request received without page ');
      return false;
    case isNaN(requestBody.page):
      logger.warn(' POST request received with NaN page ');
      return false;
    case requestBody.page <= 0:
      logger.warn(' POST request received with wrong format of page ');
      return false;
    default:
      return true;
  }
};

const searchAll = (response, page) => {
  const discoDao = new DiscoDao();

  return discoDao
    .getCountDiscos()
    .then(res => {
      discoDao.selectAll(page).then(result => {
        response.status(200).json({
          discoCount: res[0].countDisco,
          result,
        });
      });
    })
    .catch(error => {
      logger.error(error);
      response.status(500).json({
        error: 500,
        message:
          'Internal Server Error - Please contact the system administrator',
      });
    });
};

const searchFilter = (response, page, searchWord) => {
  const discoDao = new DiscoDao();

  return discoDao
    .getCountDiscosWhere(searchWord)
    .then(res => {
      discoDao.findDisco(searchWord, page).then(result => {
        response.status(200).json({
          discoCount: res[0].countDisco,
          result,
        });
      });
    })
    .catch(error => {
      response.status(500).json({
        error: 500,
        message:
          'Internal Server Error - Please contact the system administrator',
      });
    });
};

const main = (request, response) => {
  if (requestBodyValidation(request.body)) {
    const { searchWord, page } = request.body;
    if (searchWord) {
      searchFilter(response, page, searchWord);
    } else {
      searchAll(response, page);
    }
  } else {
    response.status(400).json({
      error: 400,
      message: 'Error while processing request body',
    });
  }
};

export default {
  route: '/disco/list',
  main,
};
