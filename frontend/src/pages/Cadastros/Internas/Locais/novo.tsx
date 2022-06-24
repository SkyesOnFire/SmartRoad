/* eslint-disable no-param-reassign */
import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { AxiosError, AxiosResponse } from 'axios';
import { useHistory } from 'react-router';

import FormConstructor, { IInput, ISaveBtn } from 'components/FormConstructor';
import { useToast } from 'hooks/toast';
import api from 'services/api';
import getValidationErrors from 'utils/getValidationErrors';

import { ISelectDTO } from 'utils/DTOS';
import { Container, FormContainer, Title, Desc } from '../novo-styles';

const NovoLocal: React.FC = () => {
  const module = 'local';
  const module_label = 'Local';
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const saveBtn: ISaveBtn = {
    label: 'Enviar',
    loading,
  };

  const inputs: IInput[] = [
    {
      name: 'nome',
      label: 'Nome',
      tipo: 'input',
      required: true,
    },
    {
      name: 'endereco_completo',
      label: 'Endereço',
      tipo: 'input',
    },
    {
      name: 'cidade',
      label: 'Cidade',
      tipo: 'input',
      required: true,
    },
    {
      name: 'estado',
      label: 'Estado',
      tipo: 'input',
      required: true,
    },
    {
      name: 'latitude',
      label: 'Latitude',
      tipo: 'input',
      required: true,
    },
    {
      name: 'longitude',
      label: 'Longitude',
      tipo: 'input',
      required: true,
    },
  ];

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome do local obrigatória'),
          endereco_completo: Yup.string().required(
            'Endereço do local obrigatório'
          ),
          cidade: Yup.string().required('Cidade do local obrigatória'),
          estado: Yup.string().required('Estado do local obrigatório'),
          latitude: Yup.string().required('Latitude do local obrigatória'),
          longitude: Yup.string().required('Longitude do local obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        data.latitude = parseFloat(data.latitude);
        data.longitude = parseFloat(data.longitude);

        api
          .post(`/locais`, data)
          .then((res: AxiosResponse) => {
            const { id } = res.data;

            addToast({
              type: 'success',
              title: `${module_label}${
                id && ` de id: ${id}`
              } criado com sucesso`,
            });
            history.push(`/locais`);
          })
          .catch((err: AxiosError) => {
            addToast({
              type: 'error',
              title:
                typeof err.response?.data.message === 'string'
                  ? err.response?.data.message.charAt(0).toUpperCase() +
                    err.response?.data.message.slice(1)
                  : 'Ocorreu um erro',
              description: `Ocorreu um erro ao criar o ${module}, cheque as informações e tente novamente.`,
            });
            console.error(`Erro: ${err}`);
          });
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: err.message || `Erro na criação do ${module}`,
          description: `Ocorreu um erro ao criar o ${module}, cheque as informações e tente novamente.`,
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Title>Novo {module_label}:</Title>
      <Desc>
        Campos com <b>* (asterisco)</b> são obrigatórios
      </Desc>
      <FormContainer>
        <FormConstructor
          color="quaternary"
          formColumns="1fr"
          formRef={formRef}
          inputs={inputs}
          saveBtn={saveBtn}
          submitFnc={handleSubmit}
        />
      </FormContainer>
    </Container>
  );
};

export default NovoLocal;
