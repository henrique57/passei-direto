'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var error = function error() {
  var _console;

  for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
    message[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, [_constants.LOG_COLOR.errorColor].concat(message, [_constants.LOG_COLOR.reset]));
  console.log(_constants.LOG_COLOR.reset);
};

var warn = function warn() {
  var _console2;

  for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    message[_key2] = arguments[_key2];
  }

  (_console2 = console).log.apply(_console2, [_constants.LOG_COLOR.warnColor].concat(message, [_constants.LOG_COLOR.reset]));
  console.log(_constants.LOG_COLOR.reset);
};

var info = function info() {
  var _console3;

  for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }

  (_console3 = console).log.apply(_console3, [_constants.LOG_COLOR.infoColor].concat(message, [_constants.LOG_COLOR.reset]));
};

var debug = function debug() {
  var _console4;

  for (var _len4 = arguments.length, message = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    message[_key4] = arguments[_key4];
  }

  (_console4 = console).log.apply(_console4, [_constants.LOG_COLOR.debugColor].concat(message, [_constants.LOG_COLOR.reset]));
};

var logger = {
  error: error,
  warn: warn,
  info: info,
  debug: debug
};

exports.default = logger;
//# sourceMappingURL=logger.js.map