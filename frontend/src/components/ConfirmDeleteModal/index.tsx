/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback, SetStateAction } from 'react';
import 'antd/dist/antd.compact.min.css';
import { Modal } from 'antd';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

// Styled components
import { Title, Desc, ConfirmButton } from './styles';

interface IModalAttatchment {
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  id: string;
  delete_url: string;
  module: string; // lower
}

const ConfirmDeleteModal: React.FC<IModalAttatchment> = props => {
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();

  const { delete_url, id, module, setUpdate, update, children } = props;

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const deleteThing = useCallback(() => {
    api
      .delete(`${delete_url}/${id}`)
      .then(() => {
        addToast({
          type: 'success',
          title: `${
            (module.charAt(0).toUpperCase() + module.slice(1)).lastIndexOf(
              's'
            ) ===
            (module.charAt(0).toUpperCase() + module.slice(1)).length - 1
              ? (module.charAt(0).toUpperCase() + module.slice(1)).slice(0, -1)
              : module.charAt(0).toUpperCase() + module.slice(1)
          } #${id} deletado`,
        });
        if (setUpdate) {
          setUpdate(!update);
        }
      })
      .catch(err => {
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message.charAt(0).toUpperCase() +
                err.response?.data.message.slice(1)
              : 'Ocorreu um erro',
          description: `Ocorreu um erro ao deletar o ${
            module.lastIndexOf('s') === module.length - 1
              ? module.slice(0, -1)
              : module
          }`,
        });
        console.error(`Erro: ${err}`);
      });
  }, [module, addToast, delete_url, setUpdate, update, id]);

  const handleConfirm = useCallback(async () => {
    deleteThing();
  }, [deleteThing]);

  return (
    <>
      <button
        type="button"
        onClick={e => {
          // To stop the page reloading
          e.preventDefault();
          // Lets track that custom click
          showModal();
        }}
      >
        {children}
      </button>
      <Modal
        visible={visible}
        footer={false}
        confirmLoading={false}
        onCancel={handleCancel}
        className="modal error"
        wrapClassName="wrapForm"
      >
        <Title>Confirmação</Title>
        <Desc>
          Você confirma deletar o(a){' '}
          {module.lastIndexOf('s') === module.length - 1
            ? module.slice(0, -1)
            : module}{' '}
          #{id}?
        </Desc>
        <ConfirmButton type="button" onClick={handleConfirm}>
          Confirmar
        </ConfirmButton>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
