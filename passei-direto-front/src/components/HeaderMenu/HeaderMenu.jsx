import React from 'react';
import { MenuBar, MenuItem } from '../';
import logo from '../../assets/record.svg';

export default function HeaderMenu(props) {
  return (
    <MenuBar
      logo={logo}
      altTitle="Catálogo de Discos"
      title="CATÁLOGO DE DISCOS"
      hrefTitle="/"
    >
      <MenuItem href="/" label="HOME" />
      <MenuItem href="/register/" label="CADASTRAR" />
    </MenuBar>
  );
}
