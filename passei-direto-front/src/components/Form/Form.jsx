import React, { useState } from 'react';
import './Form.scss';
import { ImageSelector, FormItem, Button } from '../';
import avatar from '../../assets/vinyl-record.svg';

export default function Form(props) {
  const [id, setId] = useState(props.id || '');
  const [artista, setArtista] = useState(props.artista || '');
  const [album, setAlbum] = useState(props.album || '');
  const [anoLancamento, setAnoLancamento] = useState(props.anoLancamento || '');
  const [gravadora, setGravadora] = useState(props.gravadora || '');
  const [tempoExecucao, setTempoExecucao] = useState(props.tempoExecucao || '');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(props.imageUrl || '');
  const [editionMode, setEditionMode] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState('Deletar Disco');

  const onChangeArtista = event => {
    setArtista(event.target.value);
  };
  const onChangeAlbum = event => {
    setAlbum(event.target.value);
  };
  const onChangeAnoLancamento = event => {
    setAnoLancamento(event.target.value);
  };
  const onChangeGravadora = event => {
    setGravadora(event.target.value);
  };
  const onChangeTempoExecucao = event => {
    setTempoExecucao(event.target.value);
  };
  const onChangeImage = image => {
    setImage(image);
    setImageUrl(URL.createObjectURL(image));
  };

  const resetField = () => {
    setId('');
    setArtista('');
    setAlbum('');
    setAnoLancamento('');
    setGravadora('');
    setTempoExecucao('');
    setImage('');
    setImageUrl('');
  };

  const validateField = (artista, album, anoLancamento, tempoExecucao) => {
    switch (true) {
      case !artista:
        return false;
      case !album:
        return false;
      case isNaN(anoLancamento):
        return false;
      case isNaN(tempoExecucao):
        return false;
      default:
        return true;
    }
  };

  const onSubmit = () => {
    const cleanFieldsCb = resetField;

    if (validateField(artista, album, anoLancamento, tempoExecucao)) {
      id
        ? props.onSubmit(
            id,
            artista,
            album,
            anoLancamento,
            gravadora,
            tempoExecucao,
            image,
            cleanFieldsCb
          )
        : props.onSubmit(
            artista,
            album,
            anoLancamento,
            gravadora,
            tempoExecucao,
            image,
            cleanFieldsCb
          );
    }
  };

  const deleteItem = () => {
    if (deleteLabel === 'Clique novamente para deletar') {
      props.onDelete(id);
    } else {
      setDeleteLabel('Clique novamente para deletar');
      setTimeout(() => {
        setDeleteLabel('Deletar Disco');
      }, 3000);
    }
  };

  const renderButtons = () => {
    switch (true) {
      case !props.id:
        return <Button type="submit" label="Cadastrar" onClick={onSubmit} />;
      case editionMode:
        return (
          <>
            <Button
              id="delete_button"
              type="button"
              label={deleteLabel}
              onClick={() => deleteItem()}
              colorType="secundary"
            />
            <Button
              type="submit"
              label="Salvar Alterações"
              onClick={onSubmit}
            />
          </>
        );
      case id && !editionMode:
        return (
          <Button
            type="button"
            label="Editar"
            onClick={() => setEditionMode(true)}
          />
        );
      default:
        return null;
    }
  };

  const renderImageSelector = () => {
    if ((editionMode && id) || !id) {
      return <ImageSelector label="Selecionar Capa" onChange={onChangeImage} />;
    }
  };

  return (
    <div id="disco_form">
      <div id="main_panel">
        <div id="left_panel">
          <img src={imageUrl || avatar} alt={album} />
          {renderImageSelector()}
        </div>
        <div id="right_panel">
          <FormItem
            label="Artista"
            value={artista}
            onChange={onChangeArtista}
            disabled={!editionMode && id}
          />
          <FormItem
            label="Album"
            value={album}
            onChange={onChangeAlbum}
            disabled={!editionMode && id}
          />
          <FormItem
            label="Ano Lançamento"
            value={anoLancamento}
            onChange={onChangeAnoLancamento}
            disabled={!editionMode && id}
          />
          <FormItem
            label="Gravadora"
            value={gravadora}
            onChange={onChangeGravadora}
            disabled={!editionMode && id}
          />
          <FormItem
            label="Tempo de Execucao"
            value={tempoExecucao}
            onChange={onChangeTempoExecucao}
            disabled={!editionMode && id}
          />
          {renderButtons()}
        </div>
      </div>
    </div>
  );
}
