'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./endpoints/index');

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use(_express2.default.urlencoded());
app.use(_express2.default.json());

(0, _index.endpoints)(app);

app.listen(port, function () {
  _logger2.default.info('- - - - - - - - - - - - - - - - - - - -');
  _logger2.default.info('-    Server running on port ' + port + '      -');
  _logger2.default.info('- - - - - - - - - - - - - - - - - - - -');
});
//# sourceMappingURL=server.js.map