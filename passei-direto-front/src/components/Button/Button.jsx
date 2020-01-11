import React, { useState, useEffect } from 'react';
import './Button.scss';

export default function Button(props) {
  const [colorType] = useState(props.colorType);
  const [typeStyle, setTypeStyle] = useState();

  useEffect(() => {
    switch (colorType) {
      case 'secundary':
        setTypeStyle('button_red');
        break;
      case 'tertiary':
        setTypeStyle('button_green');
        break;
      default:
        setTypeStyle('button');
    }
  }, []);

  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <button
        id={typeStyle}
        htmlFor="button_input"
        type={props.type}
        onClick={onClick}
      >
        {props.label}
      </button>
    </>
  );
}
