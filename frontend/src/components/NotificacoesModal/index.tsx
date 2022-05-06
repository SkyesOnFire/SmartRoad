/* eslint-disable react/jsx-indent */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback, SetStateAction } from 'react';
import 'antd/dist/antd.compact.min.css';
import { Modal } from 'antd';

import { INotificacoesDTO } from 'utils/DTOS';
import { formatDateWithHour } from 'utils/formatData';
import ConfirmCancelarModal from 'components/ConfirmCancelarModal';
import ConfirmCleanModal from 'components/ConfirmCleanModal';
import { FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Title, Body, NotificacoesHolder, Notificacao } from './styles';

interface IModalAttatchment {
  notificacoes: INotificacoesDTO[];
  setUpdate: React.Dispatch<SetStateAction<boolean>>;
  update: boolean;
}

const NotificacoesModal: React.FC<IModalAttatchment> = props => {
  const [visible, setVisible] = useState(false);

  const { notificacoes, setUpdate, update, children } = props;

  const showModal = useCallback(() => {
    setVisible(true);
    setUpdate(!update);
  }, [setUpdate, update]);

  const handleCancel = useCallback(() => {
    setVisible(false);
    setUpdate(!update);
  }, [setUpdate, update]);

  const history = useHistory();

  const handleNotificationClick = useCallback(
    (notificacao: INotificacoesDTO) => {
      if (notificacao.link) {
        history.push(notificacao.link);
        setVisible(false);
      }
    },
    [history]
  );

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
        className="modal main"
        wrapClassName="wrapForm"
      >
        <Title>Notificações</Title>
        <Body>
          {notificacoes.length !== 0 && (
            <ConfirmCleanModal
              clean_url="/notificacoes/limpar-notificao-usuario"
              module="notificações"
              setUpdate={setUpdate}
              update={update}
            >
              Marcar todas as notificações como lida
            </ConfirmCleanModal>
          )}
          <NotificacoesHolder>
            {notificacoes.length === 0
              ? 'Você não possuí nenhuma notificação!'
              : notificacoes.map(notificacao => (
                  <Notificacao
                    hasLink={!!notificacao.link}
                    onClick={() => handleNotificationClick(notificacao)}
                    key={notificacao.id}
                  >
                    <div className="column1">
                      <strong>{notificacao.assunto}</strong>
                      {notificacao.mensagem && <p>{notificacao.mensagem}</p>}
                    </div>
                    <div className="column2">
                      <span>{formatDateWithHour(notificacao.updated_at)}</span>
                      <p>{notificacao.acionador}</p>
                    </div>
                    <div className="column3">
                      <ConfirmCancelarModal
                        cancelado={notificacao.cancelado}
                        id={notificacao.id.toString()}
                        module="notificação"
                        setUpdate={setUpdate}
                        update={update}
                        update_url="/notificacoes/notificacao"
                      >
                        <FaTimes size={15} />
                      </ConfirmCancelarModal>
                    </div>
                  </Notificacao>
                ))}
          </NotificacoesHolder>
        </Body>
      </Modal>
    </>
  );
};

export default NotificacoesModal;
