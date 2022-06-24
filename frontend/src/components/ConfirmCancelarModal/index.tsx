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
  id: string;
  update_url: string;
  cancelado: boolean;
  module: string; // lower
}

const ConfirmCancelarModal: React.FC<IModalAttatchment> = props => {
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();

  const { update_url, cancelado, id, module, setUpdate, update, children } =
    props;

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const deleteThing = useCallback(() => {
    api
      .put(`${update_url}/${id}`, {
        cancelado: !cancelado,
      })
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
          } #${id} ${cancelado ? 'removido o cancelamento' : 'cancelado'}`,
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
          description: `Ocorreu um erro ao cancelar o(a) ${
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
          description: `Ocorreu um erro ao ${
            cancelado ? 'remover o cancelamento' : 'cancelar'
          } o ${
            module.lastIndexOf('s') === module.length - 1
              ? module.slice(0, -1)
              : module
          }`,
        });
        console.error(`Erro: ${err}`);
      });
  }, [
    module,
    cancelado,
    addToast,
    update_url,
    setUpdate,
    update,
    id,
    handleCancel,
  ]);

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
        className={`modalAntd ${cancelado ? 'success' : 'error'}`}
        wrapClassName="wrapForm"
      >
        <Title>Confirmação</Title>
        <Desc>
          Você confirma {cancelado ? 'remover o cancelamento' : 'cancelar'}{' '}
          {cancelado ? 'do' : 'o'}(a){' '}
          {module.lastIndexOf('s') === module.length - 1
            ? module.slice(0, -1)
            : module}{' '}
          #{id}?
        </Desc>
        <ConfirmButton
          type="button"
          className={cancelado ? 'success' : 'error'}
          onClick={handleConfirm}
        >
          Confirmar
        </ConfirmButton>
      </Modal>
    </>
  );
};

export default ConfirmCancelarModal;
