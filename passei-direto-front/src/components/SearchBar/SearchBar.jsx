import React from 'react';
import './SearchBar.scss';
import { Button } from '../';

export default function SearchBar(props) {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      props.onSearch();
    }
  };
  return (
    <div id="search_bar">
      <input
        id="search_input"
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyPress={onKeyPress}
      />
      <Button
        type="button"
        label={props.label}
        onClick={props.onSearch}
        colorType="tertiary"
      />
    </div>
  );
}
