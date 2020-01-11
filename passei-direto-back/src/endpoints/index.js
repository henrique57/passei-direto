import homeEndpoint from './get/home';
import listDiscoEndpoint from './post/listDisco';
import updateDiscoEndpoint from './put/updateDisco';
import registerDiscoEndpoint from './post/registerDisco';
import deleteDiscoEndpoint from './delete/deleteDisco';
import findDiscoEndpoint from './post/findDisco';

export const endpoints = app => {
  // ----- GET Methods ------
  app.get(homeEndpoint.route, homeEndpoint.main);

  // ----- POST Methods -----
  app.post(listDiscoEndpoint.route, listDiscoEndpoint.main);
  app.post(registerDiscoEndpoint.route, registerDiscoEndpoint.main);
  app.post(findDiscoEndpoint.route, findDiscoEndpoint.main);

  // ----- PUT Methods -----
  app.put(updateDiscoEndpoint.route, updateDiscoEndpoint.main);

  // ----- DELETE Methods -----
  app.delete(deleteDiscoEndpoint.route, deleteDiscoEndpoint.main);
};
