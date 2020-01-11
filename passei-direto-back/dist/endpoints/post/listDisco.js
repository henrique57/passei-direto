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
  switch (true) {
    case !requestBody.page:
      _logger2.default.warn(' POST request received without page ');
      return false;
    case isNaN(requestBody.page):
      _logger2.default.warn(' POST request received with NaN page ');
      return false;
    case requestBody.page <= 0:
      _logger2.default.warn(' POST request received with wrong format of page ');
      return false;
    default:
      return true;
  }
};

var main = function main(request, response) {
  if (requestBodyValidation(request.body)) {
    var discoDao = new _Disco2.default();
    var page = request.body.page;

    discoDao.getCountDiscos().then(function (res) {
      discoDao.selectAll(page).then(function (result) {
        response.status(200).json({
          discoCount: res[0].countDisco,
          result: result
        });
      });
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
  route: '/listDisco',
  main: main
};
//# sourceMappingURL=listDisco.js.map