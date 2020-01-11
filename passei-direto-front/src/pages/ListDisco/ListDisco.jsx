import React, { useState, useEffect } from 'react';
import './ListDisco.scss';
import { List, Paginator, SearchBar } from '../../components';
import DiscoService from '../../services/Api';

export default function ListDisco(props) {
  const [headers] = useState([
    'id',
    'Artista',
    'Album',
    'Ano de Lancamento',
    'Gravadora',
    'Tempo de Execucao',
    'Imagem',
  ]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    document.title = 'Catálogo de Discos';
  }, []);

  useEffect(() => {
    setSearchWord(searchWord);
  }, [searchWord]);

  useEffect(() => {
    const api = new DiscoService();

    api
      .readDisc(page, searchWord)
      .then(response => response.data)
      .then(response => {
        const numberOfPages = Math.ceil(response.discoCount / 10);
        setNumberOfPages(numberOfPages);
        setData(response.result);
      })
      .catch(e => {
        console.log(e);
      });

    //Se adicionar o campo searchWord ele vai requisitar a api a cada letra digitada
    // eslint-disable-next-line
  }, [page]);

  const onChangePage = page => {
    setPage(page);
  };

  const onChangeSearchBar = event => {
    setSearchWord(event.target.value);
  };

  const onClickSearch = () => {
    const api = new DiscoService();

    api
      .readDisc(page, searchWord)
      .then(response => response.data)
      .then(response => {
        const numberOfPages = Math.ceil(response.discoCount / 10);
        setNumberOfPages(numberOfPages);
        setData(response.result);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onClickListItem = id => {
    props.history.push({
      pathname: '/disco',
      id,
    });
  };

  return (
    <div id="container_list">
      <SearchBar
        id="search_Bar"
        label="Pesquisar"
        placeholder="Pesquisa..."
        value={searchWord}
        onChange={onChangeSearchBar}
        onSearch={onClickSearch}
      />
      <List headers={headers} data={data} onClickListItem={onClickListItem} />
      <Paginator
        id="paginator"
        current={page}
        pagesCount={numberOfPages}
        onChange={onChangePage}
        pageAroundCount={2}
      />
    </div>
  );
}
