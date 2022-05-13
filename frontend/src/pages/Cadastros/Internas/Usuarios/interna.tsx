import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { AxiosError, AxiosResponse } from 'axios';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from 'hooks/toast';
import api from 'services/api';
import FormConstructor, { IInput, ISaveBtn } from 'components/FormConstructor';
import getValidationErrors from 'utils/getValidationErrors';
import ManyToManyModal from 'components/ManyToManyModal';
import { IDepartamentosDTO, ISelectDTO } from 'utils/DTOS';

import Spinner from 'components/Spinner';
import {
  Container,
  HeaderHolder,
  HeaderItem,
  BodyHolder,
  ModalOpener,
} from '../interna-styles';
import { TitleHolder } from '../styles';

interface ParamsTypes {
  id: string | undefined;
}

const UsuariosInterna: React.FC = () => {
  const module = 'usuario';
  const module_label = 'Usuário';

  const { id } = useParams<ParamsTypes>();

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | undefined>(undefined);
  const [departamentoUsuario, setDepartamentoUsuario] = useState<ISelectDTO[]>(
    []
  );
  const [departamentos, setDepartamentos] = useState<ISelectDTO[]>([]);
  const { addToast } = useToast();

  const getDepartamentos = useCallback(async () => {
    await api
      .get('/departamentos')
      .then(async (res: AxiosResponse) => {
        const tmp: IDepartamentosDTO[] = res.data;
        const final: ISelectDTO[] = [];

        for (let i = 0; i < tmp.length; i++) {
          const tmp1 = tmp[i];

          final.push({
            label: tmp1.nome,
            value: tmp1.id.toString(),
          });
        }

        setDepartamentos(final);
      })
      .catch((err: AxiosError) => {
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message
              : 'Ocorreu um erro',
          description: `Ocorreu um erro ao buscar os departamentos, tente novamente.`,
        });
        console.error(`Erro: ${err}`);
      });
  }, [addToast, update]);

  useEffect(() => {
    getDepartamentos();
  }, [getDepartamentos]);

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
      required: true,
    },
    {
      name: 'cod_perfil',
      label: 'Perfil do Usuário',
      tipo: 'select',
      selectData: perfisDeUsuario,
      required: true,
    },
  ];

  const get = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/${module}s/${module}/${id}`)
      .then(async (res: AxiosResponse) => {
        setData(res.data);
      })
      .catch(err => {
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message
              : 'Ocorreu um erro',
          description: `Ocorreu um erro ao buscar o ${module.toLocaleLowerCase()}, tente novamente.`,
        });
        console.error(`Erro: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addToast, id, module, update]);

  useEffect(() => {
    get();
  }, [get]);

  const getDepartamentoFromUsuario = useCallback(() => {
    if (!data) {
      return;
    }
    const tmp: IDepartamentosDTO[] = data.__departamentos__;
    const final: ISelectDTO[] = [];

    for (let i = 0; i < tmp.length; i++) {
      const tmp1 = tmp[i];

      final.push({
        label: tmp1.nome,
        value: tmp1.id.toString(),
      });
    }

    setDepartamentoUsuario(final);
  }, [data, update]);

  useEffect(() => {
    getDepartamentoFromUsuario();
  }, [getDepartamentoFromUsuario]);

  const handleSubmit = useCallback(
    async (dat: any) => {
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
          comissao: Yup.string().required('A comissão é obrigatória'),
        });

        await schema.validate(dat, {
          abortEarly: false,
        });

        api
          .put(`/${module}s/${module}/${id}`, dat)
          .then((res: AxiosResponse) => {
            const { id: idd } = res.data;
            addToast({
              type: 'success',
              title: `${module_label}${
                idd && ` de id: ${idd}`
              } atualizado com sucesso`,
            });
            history.push(`/cadastros/${module}s`);
            setUpdate(!update);
          })
          .catch((err: AxiosError) => {
            addToast({
              type: 'error',
              title:
                typeof err.response?.data.message === 'string'
                  ? err.response?.data.message.charAt(0).toUpperCase() +
                    err.response?.data.message.slice(1)
                  : 'Ocorreu um erro',
              description: `Ocorreu um erro ao atualizar o ${module}, cheque as informações e tente novamente.`,
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
          title: err.message || `Erro na atuaização do ${module}`,
          description: `Ocorreu um erro ao atualizar o ${module}, cheque as informações e tente novamente.`,
        });
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [addToast, id, update]
  );

  return (
    <Container>
      {data ? (
        <>
          <HeaderHolder style={{ gridTemplateColumns: '300px' }}>
            <HeaderItem className="full">
              <ManyToManyModal
                module="usuario"
                relation="departamento"
                addUrl="/departamentos/adicionar-usuario"
                removeUrl="/departamentos/remover-usuario"
                actual_relations={departamentoUsuario}
                relations={departamentos}
                module_id={data.id.toString()}
                setUpdate={setUpdate}
                update={update}
              >
                <ModalOpener>Gerenciar Departamentos</ModalOpener>
              </ManyToManyModal>
            </HeaderItem>
          </HeaderHolder>
          <BodyHolder style={{ marginTop: 60 }}>
            <TitleHolder>
              {module_label} #{id}:
            </TitleHolder>
            <FormConstructor
              color="quaternary"
              formColumns="1fr 1fr"
              formRef={formRef}
              inputs={inputs}
              saveBtn={saveBtn}
              submitFnc={handleSubmit}
              initialData={data}
            />
          </BodyHolder>
        </>
      ) : loading ? (
        <Spinner size={15} />
      ) : (
        `${
          module.lastIndexOf('s') === module.length - 1
            ? module.slice(0, -1)
            : module
        } não encontrado...`
      )}
    </Container>
  );
};

export default UsuariosInterna;
