import DiscoDao from '../../model/Disco';
import logger from '../../utils/logger';
import { createFile } from '../../utils/file';

const requestBodyValidation = requestBody => {
  const {
    id,
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
  } = requestBody;
  switch (true) {
    case !id:
      logger.warn(' PUT request received without id ');
      return false;
    case isNaN(id):
      logger.warn(' PUT request received with NaN id ');
      return false;
    case !artista && !album && !anoLancamento && !gravadora && !tempoExecucao:
      logger.warn(' PUT request received without fields to update received ');
      return false;
    default:
      return true;
  }
};

const main = async (request, response) => {
  if (requestBodyValidation(request.body)) {
    const {
      id,
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
      .updateDisco(
        id,
        artista,
        album,
        anoLancamento,
        gravadora,
        tempoExecucao,
        imagePath
      )
      .then(() => {
        logger.info('Register updated in Database');
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
  route: '/disco/update',
  main,
};
