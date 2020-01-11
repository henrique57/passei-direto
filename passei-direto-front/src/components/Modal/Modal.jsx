import React, { useState, useEffect } from 'react';
import './Modal.scss';

export default function Modal(props) {
  const [isVisible, setVisibility] = useState(true);
  const [properties, setProperties] = useState('');

  useEffect(() => {
    let color;

    switch (props.type) {
      case 'success':
        color = '-green';
        break;
      case 'error':
        color = '-red';
        break;
      case 'warning':
        color = '-yellow';
        break;
      default:
        color = '';
    }

    const visible = `${color}`;
    setProperties(visible);
  }, [properties]);

  const closeModal = () => {
    props.onCloseModal(props.position);
    setVisibility(false);
  };

  return (
    <div id={`modal${properties}`}>
      <div id="modal_container">
        <div id="close_button">
          <label onClick={closeModal}>X</label>
        </div>
        <div id="content">{props.children}</div>
      </div>
    </div>
  );
}
