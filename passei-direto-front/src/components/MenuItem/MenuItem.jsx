import React from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.scss';

export default function MenuItem(props) {
  return (
    <li id="menu_item">
      <Link id="link" to={props.href}>
        {props.label}
      </Link>
    </li>
  );
}
