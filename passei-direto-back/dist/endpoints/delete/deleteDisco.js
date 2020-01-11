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
  var id = requestBody.id;

  switch (true) {
    case !id:
      _logger2.default.warn(' PUT request received without id ');
      return false;
    case isNaN(id):
      _logger2.default.warn(' PUT request received with NaN id ');
      return false;
    default:
      return true;
  }
};

var main = function main(request, response) {
  if (requestBodyValidation(request.body)) {
    var id = request.body.id;

    var discoDao = new _Disco2.default();
    discoDao.deleteDisco(id).then(function () {
      _logger2.default.info('Register delete from Database');
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
  route: '/deleteDisco',
  main: main
};
//# sourceMappingURL=deleteDisco.js.map