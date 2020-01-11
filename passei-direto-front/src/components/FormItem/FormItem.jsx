import React from 'react';
import './FormItem.scss';

export default function FormItem(props) {
  return (
    <div id="form_item">
      <label id="form_item_label">{props.label}</label>
      <input
        key={props.label}
        id={props.label}
        className="form_item_input"
        type="text"
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </div>
  );
}
