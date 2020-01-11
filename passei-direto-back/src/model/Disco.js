import mysql from 'promise-mysql';
import logger from '../utils/logger';

const ID_TAG = 'ID_TAG';
const OFFSET_TAG = 'OFFSET_TAG';
const SEARCH_WORD = 'SEARCH_WORD';
const MAX_NUMBER_ROWS_PAGINATION = 10;
const FIELDS_TAG = 'FIEDS_TAG';
const INSERT_VALUES_TAG = 'INSERT_VALUES_TAG';
const UPDATE_FIELDS = 'UPDATE_FIELDS';

const INSERT_QUERY = `INSERT INTO disco (${FIELDS_TAG}) VALUES (${INSERT_VALUES_TAG})`;

const COUNT_ALL_QUERY = 'SELECT COUNT(*) as countDisco from disco';

const COUNT_ALL_WHERY_QUERY = `SELECT COUNT(*) as countDisco from disco WHERE artista LIKE "%${SEARCH_WORD}%" OR album LIKE "%${SEARCH_WORD}%" OR ano_lancamento LIKE "%${SEARCH_WORD}%" OR gravadora LIKE "%${SEARCH_WORD}%"`;

const SELECT_QUERY = 'SELECT * FROM disco';

const FIND_QUERY = `SELECT * FROM disco WHERE id=${ID_TAG}`;

const UPDATE_QUERY = `UPDATE disco SET ${UPDATE_FIELDS} WHERE id=${ID_TAG}`;

const DELETE_QUERY = `DELETE FROM disco WHERE id=${ID_TAG}`;

const SEARCH_QUERY = `SELECT * FROM disco WHERE artista LIKE "%${SEARCH_WORD}%" OR album LIKE "%${SEARCH_WORD}%" OR ano_lancamento LIKE "%${SEARCH_WORD}%" OR gravadora LIKE "%${SEARCH_WORD}%"`;

const PAGINATION_PART = `LIMIT ${MAX_NUMBER_ROWS_PAGINATION} OFFSET ${OFFSET_TAG}`;

export default class DiscoDao {
  _executeQuery(query) {
    console.log(query);
    let connection;
    return mysql
      .createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
      })
      .then(conn => {
        connection = conn;
        return connection.query(query);
      })
      .then(result => {
        connection.end();
        return result;
      });
  }

  _getPaginateQuery(query, page) {
    return `${query} ${PAGINATION_PART.replace(
      OFFSET_TAG,
      (page - 1) * MAX_NUMBER_ROWS_PAGINATION
    )}`;
  }

  _getSearchQuery(query, searchWord) {
    return query
      .replace(SEARCH_WORD, searchWord)
      .replace(SEARCH_WORD, searchWord)
      .replace(SEARCH_WORD, searchWord)
      .replace(SEARCH_WORD, searchWord);
  }

  // Verifica se é necessário colocar vírgula antes do dado
  _putComma(validator, data) {
    return validator ? `, ${data}` : data;
  }

  _fieldFormatter(field, oldQuery, fieldToConcat) {
    return !field ? oldQuery : oldQuery + fieldToConcat;
  }

  _getUpdateStatement(
    id,
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    capaUrl
  ) {
    let query = this._fieldFormatter(artista, '', `artista='${artista}'`);

    query = this._fieldFormatter(
      album,
      query,
      this._putComma(artista, `album='${album}'`)
    );

    query = this._fieldFormatter(
      anoLancamento,
      query,
      this._putComma(artista || album, `ano_lancamento=${anoLancamento}`)
    );

    query = this._fieldFormatter(
      gravadora,
      query,
      this._putComma(
        artista || album || anoLancamento,
        `gravadora='${gravadora}'`
      )
    );

    query = this._fieldFormatter(
      tempoExecucao,
      query,
      this._putComma(
        artista || album || anoLancamento || gravadora,
        `tempo_execucao=${tempoExecucao}`
      )
    );

    query = this._fieldFormatter(
      capaUrl,
      query,
      this._putComma(
        artista || album || anoLancamento || gravadora || tempoExecucao,
        `capa_url='${capaUrl}'`
      )
    );

    query = UPDATE_QUERY.replace(UPDATE_FIELDS, query);

    query = query.replace(ID_TAG, id);

    return query;
  }

  _getInsertStatement(
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    capaUrl
  ) {
    let fields = 'artista, album';
    fields = anoLancamento ? fields.concat(', ano_lancamento') : fields;
    fields = gravadora ? fields.concat(', gravadora') : fields;
    fields = tempoExecucao ? fields.concat(', tempo_execucao') : fields;
    fields = capaUrl ? fields.concat(', capa_url') : fields;

    let value = `'${artista}', '${album}'`;
    value = anoLancamento ? value.concat(`, '${anoLancamento}'`) : value;
    value = gravadora ? value.concat(`, '${gravadora}'`) : value;
    value = tempoExecucao ? value.concat(`, '${tempoExecucao}'`) : value;
    value = capaUrl ? value.concat(`, '${capaUrl}'`) : value;

    return INSERT_QUERY.replace(FIELDS_TAG, fields).replace(
      INSERT_VALUES_TAG,
      value
    );
  }

  getCountDiscos() {
    return this._executeQuery(COUNT_ALL_QUERY);
  }

  getCountDiscosWhere(searchWord) {
    let query = this._getSearchQuery(COUNT_ALL_WHERY_QUERY, searchWord);
    return this._executeQuery(query);
  }

  selectAll(page) {
    return this._executeQuery(this._getPaginateQuery(SELECT_QUERY, page));
  }

  findDisco(searchWord, page) {
    let query = this._getSearchQuery(SEARCH_QUERY, searchWord);
    query = this._getPaginateQuery(query, page);
    return this._executeQuery(query);
  }

  updateDisco(
    id,
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    capaUrl
  ) {
    let query = this._getUpdateStatement(
      id,
      artista,
      album,
      anoLancamento,
      gravadora,
      tempoExecucao,
      capaUrl
    );
    return this._executeQuery(query);
  }

  insertDisco(
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    capaUrl
  ) {
    let query = this._getInsertStatement(
      artista,
      album,
      anoLancamento,
      gravadora,
      tempoExecucao,
      capaUrl
    );
    return this._executeQuery(query);
  }

  deleteDisco(id) {
    let query = DELETE_QUERY.replace(ID_TAG, id);
    return this._executeQuery(query);
  }

  findDiscoById(id) {
    let query = FIND_QUERY.replace(ID_TAG, id);
    return this._executeQuery(query);
  }
}
