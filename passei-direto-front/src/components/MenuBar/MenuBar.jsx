import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuBar.scss';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';

export default function MenuBar(props) {
  const [isSubmenuVisible, setSubmenuVisibility] = useState(false);

  return (
    <nav id="menu">
      <div id="logo_menu">
        <Link id="ref" to={props.hrefTitle}>
          <img src={props.logo} alt={props.altTitle} />
          <li id="title">{props.title}</li>
        </Link>
      </div>
      <ul id="menu_bar">{props.children}</ul>
      <ul id="burguer_menu">
        {/* <li> */}
        <MenuIcon
          id="menu_button"
          onClick={() => setSubmenuVisibility(!isSubmenuVisible)}
        />
        {isSubmenuVisible ? (
          <ul id="submenu" onClick={() => setSubmenuVisibility(false)}>
            {props.children}
          </ul>
        ) : null}
      </ul>
    </nav>
  );
}
