'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = function main(request, response) {
  _logger2.default.info('Environment: ', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    _logger2.default.info('MYSQL_HOST:', process.env.MYSQL_HOST);
    _logger2.default.info('MYSQL_PORT:', process.env.MYSQL_PORT);
    _logger2.default.info('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);
    _logger2.default.info('MYSQL_USER:', process.env.MYSQL_USER);
    _logger2.default.info('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD);
  }

  response.status(200).send('Passei Direto API is up!');
};

exports.default = {
  route: '/',
  main: main
};
//# sourceMappingURL=home.js.map