'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endpoints = undefined;

var _home = require('./get/home');

var _home2 = _interopRequireDefault(_home);

var _listDisco = require('./post/listDisco');

var _listDisco2 = _interopRequireDefault(_listDisco);

var _searchDisco = require('./post/searchDisco');

var _searchDisco2 = _interopRequireDefault(_searchDisco);

var _updateDisco = require('./put/updateDisco');

var _updateDisco2 = _interopRequireDefault(_updateDisco);

var _registerDisco = require('./post/registerDisco');

var _registerDisco2 = _interopRequireDefault(_registerDisco);

var _deleteDisco = require('./delete/deleteDisco');

var _deleteDisco2 = _interopRequireDefault(_deleteDisco);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoints = exports.endpoints = function endpoints(app) {
  // ----- GET Methods ------

  app.get(_home2.default.route, _home2.default.main);
  // ----- POST Methods -----
  app.post(_listDisco2.default.route, _listDisco2.default.main);
  app.post(_searchDisco2.default.route, _searchDisco2.default.main);
  app.post(_registerDisco2.default.route, _registerDisco2.default.main);

  // ----- PUT Methods -----
  app.put(_updateDisco2.default.route, _updateDisco2.default.main);

  // ----- DELETE Methods -----
  app.delete(_deleteDisco2.default.route, _deleteDisco2.default.main);
};
//# sourceMappingURL=index.js.map