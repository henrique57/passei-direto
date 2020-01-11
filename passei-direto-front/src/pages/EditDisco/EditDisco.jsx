import React, { useState, useEffect } from 'react';
import { Form, ModalList } from '../../components/';
import './EditDisco.scss';
import { BASE_URL } from '../../services/baseApi';
import DiscoService from '../../services/Api';

export default function EditDisco(props) {
  const [id] = useState(props.location.id || '');
  const [artista, setArtista] = useState('');
  const [album, setAlbum] = useState('');
  const [anoLancamento, setAnoLancamento] = useState('');
  const [gravadora, setGravadora] = useState('');
  const [tempoExecucao, setTempoExecucao] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalId, setModalId] = useState('');
  const [type, setModalType] = useState('');
  const [message, setModalMessage] = useState('');

  useEffect(() => {
    const api = new DiscoService();
    if (id) {
      api
        .findDisc(id)
        .then(response => response.data)
        .then(response => {
          if (response[0]) {
            setArtista(response[0].artista);
            setAlbum(response[0].album);
            setAnoLancamento(response[0].ano_lancamento);
            setGravadora(response[0].gravadora);
            setTempoExecucao(response[0].tempo_execucao);
            if (response[0].capa_url) {
              setImageUrl(BASE_URL + response[0].capa_url);
            }
            setIsLoading(false);
          }
        })
        .catch(e => {
          console.log(e);
          setModalType('error');
          setModalMessage(
            'Erro ao selecionar disco... Por favor tente novamente...'
          );
          setModalId(Math.random() * 10000);
        });
    } else {
      props.history.push({
        pathname: '/',
      });
    }
  }, []);

  const onSubmit = (
    id,
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    image
  ) => {
    const api = new DiscoService();

    api
      .updateDisco(
        id,
        artista,
        album,
        anoLancamento,
        gravadora,
        tempoExecucao,
        image
      )
      .then(response => {
        alert('Disco alterado no catálogo com sucesso!');
        props.history.push({
          pathname: '/',
        });
      })
      .catch(e => {
        console.log(e);
        setModalType('error');
        setModalMessage(
          'Erro ao atualizar disco... Por favor tente novamente...'
        );
      });
  };

  const onDelete = id => {
    const api = new DiscoService();

    api
      .deleteDisc(id)
      .then(response => response.data)
      .then(response => {
        alert('Disco deletado do catálogo com sucesso!');
        props.history.push({
          pathname: '/',
        });
      })
      .catch(e => {
        console.log(e);
        setModalType('error');
        setModalMessage(
          'Erro ao deletar disco... Por favor tente novamente...'
        );
      });
  };

  const renderForm = () =>
    !isLoading ? (
      <Form
        onSubmit={onSubmit}
        id={id}
        artista={artista}
        album={album}
        anoLancamento={anoLancamento}
        gravadora={gravadora}
        tempoExecucao={tempoExecucao}
        imageUrl={imageUrl}
        onDelete={onDelete}
      />
    ) : null;

  return (
    <div id="container">
      <ModalList id={modalId} type={type}>
        {message}
      </ModalList>
      {renderForm()}
    </div>
  );
}
