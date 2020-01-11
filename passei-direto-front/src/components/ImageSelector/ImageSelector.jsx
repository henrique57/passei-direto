import React, { useState } from 'react';
import './ImageSelector.scss';

export default function ImageSelector(props) {
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado...');

  const onChange = e => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].type.includes('image/')) {
        setFileName(e.target.files[0].name);
        !props.onChange || props.onChange(e.target.files[0]);
      } else {
        setFileName('Nenhum arquivo selecionado...');
        !props.onWrongImageType || props.onWrongImageType();
      }
    }
  };

  return (
    <div id="image_selector">
      <label id="placeholder">{fileName}</label>
      <label id="button" htmlFor="button_input">
        {props.label}
      </label>
      <input type="file" id="button_input" onChange={onChange} />
    </div>
  );
}
