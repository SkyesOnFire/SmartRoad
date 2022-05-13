import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const NovoUsuario: React.FC = () => {
  const module = 'usuario';
  const module_label = 'Usuário';
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const saveBtn: ISaveBtn = {
    label: 'Enviar',
    loading,
  };

  const perfisDeUsuario: ISelectDTO[] = [
    {
      label: 'Inicial',
      value: '0',
    },
    {
      label: 'Administrativo',
      value: '1',
    },
    {
      label: 'Comercial',
      value: '2',
    },
    {
      label: 'Coordenadores',
      value: '3',
    },
    {
      label: 'Técnico',
      value: '4',
    },
    {
      label: 'Coordenador Financeiro',
      value: '5',
    },
  ];

  const inputs: IInput[] = [
    {
      name: 'nome',
      label: 'Nome',
      tipo: 'input',
      required: true,
    },
    {
      name: 'email',
      label: 'E-mail',
      tipo: 'input',
      type: 'email',
      required: true,
    },
    {
      name: 'cpf',
      label: 'CPF',
      tipo: 'mask',
      mask: '999.999.999-99',
      required: true,
    },
    {
      name: 'senha',
      label: 'Senha',
      tipo: 'input',
      type: 'password',
      required: true,
    },
    {
      name: 'confirmarSenha',
      label: 'Confirmação de Senha',
      tipo: 'input',
      type: 'password',
      required: true,
    },
    {
      name: 'comissao',
      label: 'Comissao',
      tipo: 'input',
      type: 'number',
    },
    {
      name: 'cod_perfil',
      label: 'Perfil do Usuário',
      tipo: 'select',
      selectData: perfisDeUsuario,
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
          nome: Yup.string().required('Nome obrigatório'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .matches(
              /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}/,
              'CPF deve estar no formato correto'
            ),
          senha: Yup.string()
            .required('A senha é obrigatória')
            .min(6, 'A senha deve conter 6 ou mais caracteres'),
          confirmarSenha: Yup.string().oneOf(
            [Yup.ref('senha')],
            'A senha deve coincidir com a anterior'
          ),
          comissao: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api
          .post(`/${module}s`, data)
          .then((res: AxiosResponse) => {
            const { id } = res.data;
            addToast({
              type: 'success',
              title: `${module_label}${
                id && ` de id: ${id}`
              } criado com sucesso`,
            });
            history.push(`/cadastros/${module}s`);
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
      } catch (err) {
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

export default NovoUsuario;
