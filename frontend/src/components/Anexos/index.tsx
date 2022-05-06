import React, { useState, useRef, useCallback, SetStateAction } from 'react';
import { Modal } from 'antd';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { IAnexosDTO } from 'utils/DTOS';
import { FaFile, FaFileImage, FaFilePdf, FaTrash } from 'react-icons/fa';
import Select from 'components/Select';
import ConfirmDeleteModal from 'components/ConfirmDeleteModal';
import Input from '../Input';
import FileInput from '../Input/file';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

// Styled components
import {
  ModalCSS,
  Title,
  AnexosList,
  Indice,
  Lista,
  Linha,
  AnexosCriar,
  FormHolder,
  FormButtonHolder,
  FormButton,
  Upload,
} from './styles';

interface IModalAnexos {
  projeto_id?: string;
  anexos: IAnexosDTO[];
  update: boolean;
  setUpdate: React.Dispatch<SetStateAction<boolean>>;
}

const ModalAnexos: React.FC<IModalAnexos> = props => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { projeto_id, anexos, update, setUpdate, children } = props;

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async data => {
      if (!projeto_id) {
        addToast({
          type: 'error',
          title: 'Erro em enviar o anexo',
          description:
            'Ocorreu um erro ao enviar o anexo, recarregue a página.',
        });
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append('file', data.file);
      formData.append('nome', data.nome);
      formData.append('cod_tipo', data.cod_tipo);
      formData.append('projeto_id', projeto_id);

      api
        .post(`/anexos`, formData)
        .then(() => {
          addToast({
            type: 'success',
            title: 'Anexo enviado com sucesso',
          });
          setUpdate(!update);
        })
        .catch(err => {
          addToast({
            type: 'error',
            title: 'Erro em enviar o anexo',
            description:
              'Ocorreu um erro ao enviar o anexo, verifique os dados do formulário.',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [addToast, projeto_id, update, setUpdate]
  );

  return (
    <>
      <ModalCSS />
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
        className="modal"
        wrapClassName="wrapForm"
      >
        <Title>ANEXOS</Title>
        {anexos && anexos.length > 0 && (
          <AnexosList>
            <Indice>
              <div className="nome">Nome</div>
              <div className="tipo">Tipo</div>
              <div className="visualizar">Ações</div>
            </Indice>

            {anexos.map(anexo => (
              <Lista>
                <Linha>
                  <div className="nome">{anexo.nome}</div>
                  <div className="tipo">{anexo.des_tipo}</div>
                  <div className="visualizar">
                    <FaFile
                      size={15}
                      onClick={() => {
                        window.open(anexo.url);
                      }}
                    />
                    <ConfirmDeleteModal
                      delete_url="/anexos/anexo"
                      id={anexo.id.toString()}
                      module="anexo"
                      setUpdate={setUpdate}
                      update={update}
                    >
                      <FaTrash />
                    </ConfirmDeleteModal>
                  </div>
                </Linha>
              </Lista>
            ))}
          </AnexosList>
        )}
        <AnexosCriar>
          <strong>Adicionar anexo</strong>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormHolder>
              <label htmlFor="nome">Nome do arquivo</label>
              <Input id="nome" name="nome" placeholder="Nome" />
              <label htmlFor="tipo">Tipo do arquivo</label>
              <Select
                options={[
                  { value: 0, label: 'Técnico' },
                  { value: 1, label: 'Financeiro' },
                ]}
                name="cod_tipo"
                id="cod_tipo"
              />
              <FormButtonHolder>
                <FormButton type="submit">
                  {loading ? 'Carregando...' : 'ENVIAR'}
                </FormButton>
              </FormButtonHolder>
            </FormHolder>
            <Upload>
              <FileInput name="file" />
            </Upload>
          </Form>
        </AnexosCriar>
      </Modal>
    </>
  );
};

export default ModalAnexos;
