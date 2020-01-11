import React, { useState, useEffect } from 'react';
import { Form, ModalList } from '../../components/';
import './RegisterDisco.scss';
import DiscoService from '../../services/Api';

export default function RegisterDisco(props) {
  const [modalId, setModalId] = useState('');
  const [type, setModalType] = useState('');
  const [message, setModalMessage] = useState('');

  useEffect(() => {
    document.title = 'Cadastrar Disco';
  });

  const onSubmit = (
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    image,
    cleanFieldsCb
  ) => {
    const api = new DiscoService();

    api
      .createDisco(
        artista,
        album,
        anoLancamento,
        gravadora,
        tempoExecucao,
        image
      )
      .then(response => {
        cleanFieldsCb();
        setModalType('success');
        setModalMessage('Disco inserido no catálogo com sucesso!');
        setModalId(Math.random() * 10000);
      })
      .catch(e => {
        setModalType('error');
        setModalMessage(
          'Erro ao inserir disco... Por favor tente novamente...'
        );
        setModalId(Math.random() * 10000);
      });
  };

  return (
    <div id="container_form">
      <ModalList id={modalId} type={type}>
        {message}
      </ModalList>
      <Form onSubmit={onSubmit} />
    </div>
  );
}
