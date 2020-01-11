'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Disco = require('../../model/Disco');

var _Disco2 = _interopRequireDefault(_Disco);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestBodyValidation = function requestBodyValidation(requestBody) {
  var id = requestBody.id,
      artista = requestBody.artista,
      album = requestBody.album,
      anoLancamento = requestBody.anoLancamento,
      gravadora = requestBody.gravadora,
      tempoExecucao = requestBody.tempoExecucao;

  switch (true) {
    case !id:
      _logger2.default.warn(' PUT request received without id ');
      return false;
    case isNaN(id):
      _logger2.default.warn(' PUT request received with NaN id ');
      return false;
    case !artista && !album && !anoLancamento && !gravadora && !tempoExecucao:
      _logger2.default.warn(' PUT request received without fields to update received ');
      return false;
    default:
      return true;
  }
};

var main = function main(request, response) {
  if (requestBodyValidation(request.body)) {
    var _request$body = request.body,
        id = _request$body.id,
        artista = _request$body.artista,
        album = _request$body.album,
        anoLancamento = _request$body.anoLancamento,
        gravadora = _request$body.gravadora,
        tempoExecucao = _request$body.tempoExecucao;

    var discoDao = new _Disco2.default();
    discoDao.updateDisco(id, artista, album, anoLancamento, gravadora, tempoExecucao).then(function () {
      _logger2.default.info('Register updated in Database');
      response.status(200).send();
    }).catch(function (error) {
      _logger2.default.error(error);
      response.status(500).json({
        error: 500,
        message: 'Internal Server Error - Please contact the system administrator'
      });
    });
  } else {
    response.status(400).json({
      error: 400,
      message: 'Error while processing request body'
    });
  }
};

exports.default = {
  route: '/updateDisco',
  main: main
};
//# sourceMappingURL=updateDisco.js.map