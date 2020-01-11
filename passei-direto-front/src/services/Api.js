import api from './baseApi';

export default class Api {
  createDisco = (
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    image
  ) => {
    var formData = new FormData();

    formData.append('artista', artista);
    formData.append('album', album);
    formData.append('anoLancamento', anoLancamento);
    formData.append('gravadora', gravadora);
    formData.append('tempoExecucao', tempoExecucao);
    formData.append('image', image);

    return api.post('/disco/register', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  readDisc = (page, searchWord = '') => {
    const jsonBody = {
      page,
      searchWord,
    };

    return api.post('/disco/list', jsonBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  updateDisco = (
    id,
    artista,
    album,
    anoLancamento,
    gravadora,
    tempoExecucao,
    image
  ) => {
    var formData = new FormData();

    formData.append('id', id);
    formData.append('artista', artista);
    formData.append('album', album);
    formData.append('anoLancamento', anoLancamento);
    formData.append('gravadora', gravadora);
    formData.append('tempoExecucao', tempoExecucao);
    if (image) {
      formData.append('image', image);
    }

    return api.put('/disco/update', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  deleteDisc = id => {
    const jsonBody = {
      id,
    };

    return api.delete('/disco/delete', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: jsonBody,
    });
  };

  findDisc = id => {
    const jsonBody = {
      id,
    };

    return api.post('/disco/find', jsonBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}
