'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promiseMysql = require('promise-mysql');

var _promiseMysql2 = _interopRequireDefault(_promiseMysql);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ARTISTA_TAG = 'ARTISTA_TAG';
var ALBUM_TAG = 'ALBUM_TAG';
var ANO_TAG = 'ANO_TAG';
var GRAVADORA_TAG = 'GRAVADORA_TAG';
var ID_TAG = 'ID_TAG';
var OFFSET_TAG = 'OFFSET_TAG';
var SEARCH_WORD = 'SEARCH_WORD';
var MAX_NUMBER_ROWS_PAGINATION = 10;
var FIELDS_TAG = 'FIEDS_TAG';
var INSERT_VALUES_TAG = 'INSERT_VALUES_TAG';
var UPDATE_FIELDS = 'UPDATE_FIELDS';

var INSERT_QUERY = 'INSERT INTO disco (' + FIELDS_TAG + ') VALUES (' + INSERT_VALUES_TAG + ')';

var COUNT_ALL_QUERY = 'SELECT COUNT(*) as countDisco from disco';

var COUNT_ALL_WHERY_QUERY = 'SELECT COUNT(*) as countDisco from disco WHERE artista LIKE "%SEARCH_WORD%" OR album LIKE "%SEARCH_WORD%"';

var SELECT_QUERY = 'SELECT * FROM disco';

var UPDATE_QUERY = 'UPDATE disco SET ' + UPDATE_FIELDS + ' WHERE id=' + ID_TAG;

var DELETE_QUERY = 'DELETE FROM disco WHERE id=' + ID_TAG;

var SEARCH_QUERY = 'SELECT * FROM disco WHERE artista LIKE "%' + SEARCH_WORD + '%" OR album LIKE "%' + SEARCH_WORD + '%"';

var PAGINATION_PART = 'LIMIT ' + MAX_NUMBER_ROWS_PAGINATION + ' OFFSET ' + OFFSET_TAG;

var DiscoDao = function () {
  function DiscoDao() {
    _classCallCheck(this, DiscoDao);
  }

  _createClass(DiscoDao, [{
    key: '_executeQuery',
    value: function _executeQuery(query) {
      var connection = void 0;
      return _promiseMysql2.default.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
      }).then(function (conn) {
        connection = conn;
        return connection.query(query);
      }).then(function (result) {
        connection.end();
        return result;
      });
    }
  }, {
    key: '_getPaginateQuery',
    value: function _getPaginateQuery(query, page) {
      return query + ' ' + PAGINATION_PART.replace(OFFSET_TAG, (page - 1) * MAX_NUMBER_ROWS_PAGINATION);
    }
  }, {
    key: '_getSearchQuery',
    value: function _getSearchQuery(query, searchWord) {
      return query.replace(SEARCH_WORD, searchWord).replace(SEARCH_WORD, searchWord);
    }

    // Verifica se é necessário colocar vírgula antes do dado

  }, {
    key: '_putComma',
    value: function _putComma(validator, data) {
      return validator ? ', ' + data : data;
    }
  }, {
    key: '_fieldFormatter',
    value: function _fieldFormatter(field, oldQuery, fieldToConcat) {
      return !field ? oldQuery : oldQuery + fieldToConcat;
    }
  }, {
    key: '_getUpdateStatement',
    value: function _getUpdateStatement(id, artista, album, anoLancamento, gravadora, tempoExecucao) {
      var query = this._fieldFormatter(artista, '', 'artista=\'' + artista + '\'');

      query = this._fieldFormatter(album, query, this._putComma(artista, 'album=\'' + album + '\''));

      query = this._fieldFormatter(anoLancamento, query, this._putComma(artista || album, 'ano_lancamento=\'' + anoLancamento + '\''));

      query = this._fieldFormatter(gravadora, query, this._putComma(artista || album || anoLancamento, 'gravadora=\'' + gravadora + '\''));

      query = this._fieldFormatter(tempoExecucao, query, this._putComma(artista || album || anoLancamento || gravadora, 'tempo_execucao=' + tempoExecucao));

      query = UPDATE_QUERY.replace(UPDATE_FIELDS, query);

      query = query.replace(ID_TAG, id);

      return query;
    }
  }, {
    key: '_getInsertStatement',
    value: function _getInsertStatement(artista, album, anoLancamento, gravadora, tempoExecucao) {
      var fields = 'artista, album';
      fields = anoLancamento ? fields.concat(', ano_lancamento') : fields;
      fields = gravadora ? fields.concat(', gravadora') : fields;
      fields = tempoExecucao ? fields.concat(', tempo_execucao') : fields;

      var value = '\'' + artista + '\', \'' + album + '\'';
      value = anoLancamento ? value.concat(', \'' + anoLancamento + '\'') : value;
      value = gravadora ? value.concat(', \'' + gravadora + '\'') : value;
      value = tempoExecucao ? value.concat(', \'' + tempoExecucao + '\'') : value;

      return INSERT_QUERY.replace(FIELDS_TAG, fields).replace(INSERT_VALUES_TAG, value);
    }
  }, {
    key: 'getCountDiscos',
    value: function getCountDiscos() {
      return this._executeQuery(COUNT_ALL_QUERY);
    }
  }, {
    key: 'getCountDiscosWhere',
    value: function getCountDiscosWhere(searchWord) {
      var query = this._getSearchQuery(COUNT_ALL_WHERY_QUERY, searchWord);
      return this._executeQuery(query);
    }
  }, {
    key: 'selectAll',
    value: function selectAll(page) {
      return this._executeQuery(this._getPaginateQuery(SELECT_QUERY, page));
    }
  }, {
    key: 'findDisco',
    value: function findDisco(searchWord, page) {
      var query = this._getSearchQuery(SEARCH_QUERY, searchWord);
      query = this._getPaginateQuery(query, page);
      return this._executeQuery(query);
    }
  }, {
    key: 'updateDisco',
    value: function updateDisco(id, artista, album, anoLancamento, gravadora, tempoExecucao) {
      var query = this._getUpdateStatement(id, artista, album, anoLancamento, gravadora, tempoExecucao);
      return this._executeQuery(query);
    }
  }, {
    key: 'insertDisco',
    value: function insertDisco(artista, album, anoLancamento, gravadora, tempoExecucao) {
      var query = this._getInsertStatement(artista, album, anoLancamento, gravadora, tempoExecucao);
      return this._executeQuery(query);
    }
  }, {
    key: 'deleteDisco',
    value: function deleteDisco(id) {
      var query = DELETE_QUERY.replace(ID_TAG, id);
      return this._executeQuery(query);
    }
  }]);

  return DiscoDao;
}();

exports.default = DiscoDao;
//# sourceMappingURL=Disco.js.map