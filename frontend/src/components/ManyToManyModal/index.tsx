/* eslint-disable react/destructuring-assignment */
import React, {
  useState,
  useCallback,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import 'antd/dist/antd.compact.min.css';
import { Modal } from 'antd';
import * as Yup from 'yup';

import { ISelectDTO } from 'utils/DTOS';
import Select from 'components/Select';
import { AxiosError, AxiosResponse } from 'axios';
import getValidationErrors from 'utils/getValidationErrors';
import Spinner from 'components/Spinner';
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
  module_id: string;
  module: string;
  relation: string;
  relations: ISelectDTO[];
  actual_relations: ISelectDTO[];
  removeUrl: string;
  addUrl: string;
}

interface IAddData {
  adicionar_id: string;
}

interface IRemoveData {
  remover_id: string;
}

const ManyToManyModal: React.FC<IModalAttatchment> = props => {
  const [loading, setLoading] = useState<boolean>(false);
  const formRefAdd = useRef<FormHandles>(null);
  const formRefRemove = useRef<FormHandles>(null);
  const [visible, setVisible] = useState(false);
  const [addLps, setAddLps] = useState<ISelectDTO[]>([]);
  const { addToast } = useToast();

  const {
    children,
    setUpdate,
    update,
    module_id,
    module,
    relation,
    relations,
    actual_relations,
    removeUrl,
    addUrl,
  } = props;

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const getAddLps = useCallback(() => {
    const tmp_lps: ISelectDTO[] = [];

    for (let i = 0; i < relations.length; i++) {
      const rel = relations[i];

      if (
        actual_relations.filter(act => act.value === rel.value).length === 0
      ) {
        tmp_lps.push(rel);
      }
    }

    setAddLps(tmp_lps);
  }, [actual_relations, relations]);

  useEffect(() => {
    getAddLps();
  }, [getAddLps]);

  const handleAdd = useCallback(
    async (data: IAddData, { reset }) => {
      try {
        setLoading(true);

        formRefAdd.current?.setErrors({});

        const schema = Yup.object().shape({
          adicionar_id: Yup.string().required(
            `${
              relation.charAt(0).toUpperCase() + relation.slice(1)
            } obrigatório(a)`
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const tmp_params: any = {};
        tmp_params[module] = module_id.toString();
        tmp_params[relation] = data.adicionar_id;

        const params = new URLSearchParams(tmp_params).toString();

        api
          .put(`${addUrl}?${params}`)
          .then((res: AxiosResponse) => {
            addToast({
              type: 'success',
              title: `${
                relation.charAt(0).toUpperCase() + relation.slice(1)
              } adicionado(a) com sucesso no(a) ${module}`,
            });
            setUpdate && setUpdate(!update);
            reset();
          })
          .catch((err: AxiosError) => {
            addToast({
              type: 'error',
              title:
                typeof err.response?.data.message === 'string'
                  ? err.response?.data.message.charAt(0).toUpperCase() +
                    err.response?.data.message.slice(1)
                  : 'Ocorreu um erro',
              description: `Ocorreu um erro ao adicionar o(a) ${relation} no(a) ${module}, cheque as informações e tente novamente.`,
            });
            console.error(`Erro: ${err}`);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRefAdd.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title:
            err.message || `Erro na adição do(a) ${relation} no(a) ${module}`,
          description: `Ocorreu um erro ao adicionar o(a) ${relation} no(a) ${module}, cheque as informações e tente novamente.`,
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [addToast, module, relation, setUpdate, update, addUrl, module_id]
  );

  const handleRemove = useCallback(
    async (data: IRemoveData, { reset }) => {
      try {
        setLoading(true);

        const select = formRefAdd.current?.getFieldRef('adicionar_id');

        select.select.clearValue();

        const schema = Yup.object().shape({
          remover_id: Yup.string().required(
            `${
              relation.charAt(0).toUpperCase() + relation.slice(1)
            } obrigatório(a)`
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const tmp_params: any = {};
        tmp_params[module] = module_id.toString();
        tmp_params[relation] = data.remover_id;

        const params = new URLSearchParams(tmp_params).toString();

        api
          .put(`${removeUrl}?${params}`)
          .then((res: AxiosResponse) => {
            addToast({
              type: 'success',
              title: `${
                relation.charAt(0).toUpperCase() + relation.slice(1)
              } removido(a) com sucesso no(a) ${module}`,
            });
            setUpdate && setUpdate(!update);
            reset();
          })
          .catch((err: AxiosError) => {
            addToast({
              type: 'error',
              title:
                typeof err.response?.data.message === 'string'
                  ? err.response?.data.message.charAt(0).toUpperCase() +
                    err.response?.data.message.slice(1)
                  : 'Ocorreu um erro',
              description: `Ocorreu um erro ao remover o(a) ${relation} no(a) ${module}, cheque as informações e tente novamente.`,
            });
            console.error(`Erro: ${err}`);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRefAdd.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title:
            err.message || `Erro na adição do(a) ${relation} no(a) ${module}`,
          description: `Ocorreu um erro ao remover o(a) ${relation} no(a) ${module}, cheque as informações e tente novamente.`,
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [addToast, module, relation, setUpdate, update, removeUrl, module_id]
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
        <Title>Gerenciar os {relation}</Title>
        <FormContainer>
          <Form ref={formRefAdd} onSubmit={handleAdd}>
            <FormRow>
              <InputHolder>
                <label htmlFor="adicionar_id">Adicionar {relation}</label>
                <Select name="adicionar_id" options={addLps} />
              </InputHolder>
              <SaveButton disabled={loading} type="submit">
                {loading ? <Spinner size={15} /> : 'Adicionar'}
              </SaveButton>
            </FormRow>
          </Form>
          <Form ref={formRefRemove} onSubmit={handleRemove}>
            <FormRow>
              <InputHolder>
                <label htmlFor="remover_id">Remover {relation}</label>
                <Select name="remover_id" options={actual_relations} />
              </InputHolder>
              <SaveButton disabled={loading} type="submit">
                {loading ? <Spinner size={15} /> : 'Remover'}
              </SaveButton>
            </FormRow>
          </Form>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ManyToManyModal;
