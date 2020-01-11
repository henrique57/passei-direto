import DiscoDao from '../../model/Disco';
import logger from '../../utils/logger';
import { createFile } from '../../utils/file';

const requestBodyValidation = requestBody => {
  const { artista, album, tempoExecucao } = requestBody;
  switch (true) {
    case isNaN(tempoExecucao):
      logger.warn(' POST request received with NaN id ');
      return false;
    case !artista || !album:
      logger.warn(' POST request received without fields to insert ');
      return false;
    default:
      return true;
  }
};

const main = async (request, response) => {
  if (requestBodyValidation(request.body)) {
    const {
      artista,
      album,
      anoLancamento,
      gravadora,
      tempoExecucao,
    } = request.body;
    const { files } = request;
    const discoDao = new DiscoDao();
    let imagePath = '';

    if (files) {
      if (files.image) {
        imagePath = await createFile(files.image);
      }
    }

    discoDao
      .insertDisco(
        artista,
        album,
        anoLancamento,
        gravadora,
        tempoExecucao,
        imagePath
      )
      .then(result => {
        logger.info('Register included in Database');
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
  route: '/disco/register',
  main,
};
