/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback, SetStateAction } from 'react';
import 'antd/dist/antd.compact.min.css';
import { Modal } from 'antd';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

// Styled components
import { Title, Desc, ConfirmButton } from './styles';

interface IModalAttatchment {
  update: boolean;
  setUpdate: React.Dispatch<SetStateAction<boolean>>;
  clean_url: string;
  module: string; // lower
}

const ConfirmCleanModal: React.FC<IModalAttatchment> = props => {
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();

  const { clean_url, module, setUpdate, update, children } = props;

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const cleanThing = useCallback(() => {
    api
      .put(`${clean_url}`)
      .then(() => {
        addToast({
          type: 'success',
          title: `Suas ${module} foram limpadas com sucesso`,
        });
        if (setUpdate) {
          setUpdate(!update);
        }
        handleCancel();
      })
      .catch(err => {
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message.charAt(0).toUpperCase() +
                err.response?.data.message.slice(1)
              : 'Ocorreu um erro',
          description: `Ocorreu um erro ao limpar suas ${
            (module.charAt(0).toUpperCase() + module.slice(1)).lastIndexOf(
              's'
            ) ===
            (module.charAt(0).toUpperCase() + module.slice(1)).length - 1
              ? (module.charAt(0).toUpperCase() + module.slice(1)).slice(0, -1)
              : module.charAt(0).toUpperCase() + module.slice(1)
          }, cheque as informações e tente novamente.`,
        });
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message.charAt(0).toUpperCase() +
                err.response?.data.message.slice(1)
              : 'Ocorreu um erro',
          description: `Ocorreu um erro ao limpar suas ${
            (module.charAt(0).toUpperCase() + module.slice(1)).lastIndexOf(
              's'
            ) ===
            (module.charAt(0).toUpperCase() + module.slice(1)).length - 1
              ? (module.charAt(0).toUpperCase() + module.slice(1)).slice(0, -1)
              : module.charAt(0).toUpperCase() + module.slice(1)
          }, cheque as informações e tente novamente.`,
        });
        console.error(`Erro: ${err}`);
      });
  }, [module, addToast, clean_url, setUpdate, update, handleCancel]);

  const handleConfirm = useCallback(async () => {
    cleanThing();
  }, [cleanThing]);

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
        className="buttonModal"
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
        <Desc>Você confirma limpar suas {module}?</Desc>
        <ConfirmButton type="button" className="error" onClick={handleConfirm}>
          Confirmar
        </ConfirmButton>
      </Modal>
    </>
  );
};

export default ConfirmCleanModal;
