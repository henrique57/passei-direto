import React, { useState, useEffect } from 'react';
import './ModalList.scss';
import { Modal } from '../';

export default function ModalList(props) {
  const [modalList, setModalList] = useState([]);

  useEffect(() => {
    if (props.type !== '' && props.children !== '') {
      const tmp = modalList.concat({
        type: props.type,
        message: props.children,
      });
      setModalList(tmp);
    }
  }, [props.id]);

  const onCloseModal = position => {
    setModalList(modalList.filter((modal, index) => position !== index));
  };

  const getModalList = () => {
    if (modalList.length) {
      return modalList.map((modal, index) => (
        <Modal
          key={index}
          position={index}
          type={modal.type}
          onCloseModal={onCloseModal}
        >
          {modal.message}
        </Modal>
      ));
    }
  };

  return <div id="modal_list">{getModalList()}</div>;
}
