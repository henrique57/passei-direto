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
  var artista = requestBody.artista,
      album = requestBody.album,
      tempoExecucao = requestBody.tempoExecucao;

  switch (true) {
    case isNaN(tempoExecucao):
      _logger2.default.warn(' POST request received with NaN id ');
      return false;
    case !artista || !album:
      _logger2.default.warn(' POST request received without fields to update ');
      return false;
    default:
      return true;
  }
};

var main = function main(request, response) {
  if (requestBodyValidation(request.body)) {
    var _request$body = request.body,
        artista = _request$body.artista,
        album = _request$body.album,
        anoLancamento = _request$body.anoLancamento,
        gravadora = _request$body.gravadora,
        tempoExecucao = _request$body.tempoExecucao;

    var discoDao = new _Disco2.default();
    discoDao.insertDisco(artista, album, anoLancamento, gravadora, tempoExecucao).then(function () {
      _logger2.default.info('Register included in Database');
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
  route: '/registerDisco',
  main: main
};
//# sourceMappingURL=registerDisco.js.map