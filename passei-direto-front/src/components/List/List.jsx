import React, { useState, useEffect } from 'react';
import './List.scss';
import { BASE_URL } from '../../services/baseApi';

export default function List(props) {
  const [headers, setHeaders] = useState(props.headers);
  const [data, setData] = useState([]);

  useEffect(() => {
    setHeaders(props.headers);
  }, [props.headers]);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const renderHeader = () => (
    <thead>
      <tr id="header">
        {headers.map((column, index) => {
          if (index !== 0) {
            return (
              <td id="header_cell" key={index}>
                {column}
              </td>
            );
          }
          return null;
        })}
      </tr>
    </thead>
  );

  const onClickListItem = discoId => {
    if (props.onClickListItem) {
      props.onClickListItem(discoId);
    }
  };

  const renderData = () => (
    <tbody>
      {data.map((dataRow, index) => (
        <tr id="body" key={index} onClick={() => onClickListItem(dataRow.id)}>
          {Object.values(dataRow).map((dataColumn, index) => {
            if (index !== 0) {
              if (index === 6 && dataColumn) {
                return (
                  <td id="body_cell_image" key={index}>
                    <div id="img_area">
                      <img
                        id="album_cover"
                        src={BASE_URL + dataColumn}
                        alt={index}
                      />
                    </div>
                  </td>
                );
              }
              return (
                <td id="body_cell" key={index}>
                  {dataColumn}
                </td>
              );
            }
            return null;
          })}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table id="list">
      {renderHeader()}
      {renderData()}
    </table>
  );
}
