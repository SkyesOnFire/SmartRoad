/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback, SetStateAction, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import 'antd/dist/antd.compact.min.css';
import { Modal } from 'antd';
import * as Yup from 'yup';

import Input from 'components/Input';
import Spinner from 'components/Spinner';
import getValidationErrors from 'utils/getValidationErrors';
import { IChecklistsDTO, ISelectDTO } from 'utils/DTOS';
import Select from 'components/Select';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

// Styled components
import {
  Title,
  FormContainer,
  SaveButton,
  FormRow,
  InputHolder,
} from './styles';

interface IModalAttatchment {
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  usuarios_tarefa: ISelectDTO[];
  tarefa_id: string;
  editing?: boolean;
  initialData?: IChecklistsDTO;
}

const NovoChecklistModal: React.FC<IModalAttatchment> = props => {
  const formRef = useRef<FormHandles>(null);
  const [visible, setVisible] = useState(false);
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    children,
    setUpdate,
    update,
    usuarios_tarefa,
    tarefa_id,
    editing,
    initialData,
  } = props;

  if (editing && !initialData) {
    throw Error('No data for edit');
  }

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (data: any) => {
      data.tarefa_id = tarefa_id;
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          atividade: Yup.string().required('Atividade obrigatória'),
          responsavel_id: Yup.string().required('Responsável obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        if (editing && initialData) {
          api
            .put(`/checklists/checklist/${initialData.id}`, data)
            .then(res => {
              addToast({
                type: 'success',
                title: `Checklist editado com sucesso`,
              });
              setUpdate && setUpdate(!update);
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
                description:
                  'Ocorreu um erro ao editar o checklist, cheque as informações e tente novamente.',
              });
              console.error(`Erro: ${err}`);
            });
        } else {
          api
            .post(`/checklists`, data)
            .then(res => {
              addToast({
                type: 'success',
                title: `Checklist criado com sucesso na tarefa ${tarefa_id}`,
              });
              setUpdate && setUpdate(!update);
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
                description:
                  'Ocorreu um erro ao criar o checklist, cheque as informações e tente novamente.',
              });
              console.error(`Erro: ${err}`);
            });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na criação/edição do checklist',
          description:
            'Ocorreu um erro ao criar/editar o checklist, cheque as informações e tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, tarefa_id, setUpdate, update, handleCancel, editing, initialData]
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
        className="modal secundary"
        wrapClassName="wrapForm"
      >
        <Title>
          {editing && initialData
            ? `Editando Checklist #${initialData.id}`
            : 'Novo Checklist'}
        </Title>
        <FormContainer>
          <Form
            initialData={editing && initialData ? initialData : {}}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <FormRow>
              <InputHolder>
                <label htmlFor="atividade">Atividade *</label>
                <Input name="atividade" placeholder="Digite aqui a atividade" />
              </InputHolder>
              <InputHolder>
                <label htmlFor="responsavel_id">Responsável *</label>
                <Select options={usuarios_tarefa} name="responsavel_id" />
              </InputHolder>
            </FormRow>
            <FormRow>
              <InputHolder>
                <label htmlFor="prazo_inicio">Prazo de Início</label>
                <Input
                  name="prazo_inicio"
                  type="date"
                  placeholder="Digite aqui o prazo de início"
                />
              </InputHolder>
              <InputHolder>
                <label htmlFor="prazo_conclusao">Prazo de Conclusão</label>
                <Input
                  name="prazo_conclusao"
                  type="date"
                  placeholder="Digite aqui o prazo de conclusão"
                />
              </InputHolder>
            </FormRow>
            <SaveButton
              type="button"
              onClick={() => formRef.current?.submitForm()}
            >
              {loading ? <Spinner size={15} /> : 'Registrar'}
            </SaveButton>
          </Form>
        </FormContainer>
      </Modal>
    </>
  );
};

export default NovoChecklistModal;
