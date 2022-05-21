import React, { SetStateAction, useCallback, useRef, useState } from 'react';

import { LineItem } from 'styles/others';
import { FaCheckCircle } from 'react-icons/fa';
import { IInput } from 'components/FormConstructor';
import { FormHandles } from '@unform/core';

import Input from 'components/Input';
import Select from 'components/Select';
import Textarea from 'components/Input/textarea';
import Checkbox from 'components/Checkbox';
import InputCurrency from 'components/Input/currency';
import PhoneMaskedInput from 'components/Input/phone-mask';
import MaskedInput from 'components/Input/mask';

import Spinner from 'components/Spinner';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import { AxiosError } from 'axios';
import { UnForm } from './styles';

export interface InputProps extends IInput {
  data: string;
  noInput?: boolean;
}

interface IProps {
  inputData: InputProps[];
  data: any;
  template: string;

  update: boolean;
  setUpdate: React.Dispatch<SetStateAction<boolean>>;
  edit_url: string;
  module: string; // lower
}

const EditInTable: React.FC<IProps> = props => {
  const { inputData, data, template, update, setUpdate, edit_url, module } =
    props;

  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);

  const getValue = useCallback(
    (input: InputProps) => {
      if (input.noInput) {
        if (input.data.includes('.')) {
          const tmp_dat = [input.data.split('.')[0], input.data.split('.')[1]];
          return data[tmp_dat[0]]
            ? data[tmp_dat[0]][tmp_dat[1]].toString()
            : '-';
        }
        return data[input.data];
      }
      switch (input.tipo) {
        case 'input':
          return (
            <Input
              type={input.type}
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              // required={input.required}
            />
          );
        case 'textarea':
          return (
            <Textarea
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              // required={input.required}
            />
          );
        case 'mask':
          if (!input.mask) {
            console.error(`no mask at ${input.name}`);
            return;
          }
          return (
            <MaskedInput
              style={input.style}
              mask={input.mask}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              // required={input.required}
            />
          );
        case 'select':
          if (!input.selectData) {
            console.error(`no select data at ${input.name}`);
            return;
          }
          return (
            <Select
              style={input.style}
              // required={input.required}
              name={input.name}
              options={input.selectData}
            />
          );
        case 'checkbox':
          return (
            <Checkbox
              name={input.name}
              options={[
                {
                  name: input.name,
                  value: 'true',
                  label: input.label,
                },
              ]}
            />
          );
        case 'phone':
          return (
            <PhoneMaskedInput
              mask=""
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              // required={input.required}
            />
          );
        case 'currency':
          return (
            <InputCurrency
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              // required={input.required}
            />
          );
        default:
          break;
      }
    },
    [data]
  );

  const { addToast } = useToast();

  const tratarValor = useCallback((valor: string) => {
    const valorString = valor
      .replace('R$ ', '')
      .replace('.', '')
      .replace(',', '.');

    const split = valorString.split('.');

    if (
      split.length > 1 &&
      split[split.length - 1] &&
      split[split.length - 1].length === 3
    ) {
      split[split.length - 1] = split[split.length - 1].substring(
        0,
        split[split.length - 1].length - 1
      );
    }

    const valorFinal = parseFloat(`${split[0]}.${split[1]}`);

    return valorFinal;
  }, []);

  const edit = useCallback(
    (dat: any) => {
      try {
        setLoading(true);

        const keys = Object.keys(dat);

        keys.forEach(key => {
          if (dat[key].toString().includes('R$')) {
            // eslint-disable-next-line no-param-reassign
            dat[key] = tratarValor(dat[key]);
          }
        });

        api
          .put(`${edit_url}/${data.id}`, dat)
          .then(res => {
            addToast({
              type: 'success',
              title: `${
                (module.charAt(0).toUpperCase() + module.slice(1)).lastIndexOf(
                  's'
                ) ===
                (module.charAt(0).toUpperCase() + module.slice(1)).length - 1
                  ? (module.charAt(0).toUpperCase() + module.slice(1)).slice(
                      0,
                      -1
                    )
                  : module.charAt(0).toUpperCase() + module.slice(1)
              } #${data.id} editado`,
            });
            setUpdate(!update);
          })
          .catch((err: AxiosError) => {
            addToast({
              type: 'error',
              title:
                typeof err.response?.data.message === 'string'
                  ? err.response?.data.message
                  : 'Ocorreu um erro',
              description: `Ocorreu um erro ao editar o ${
                module.lastIndexOf('s') === module.length - 1
                  ? module.slice(0, -1)
                  : module
              }, tente novamente.`,
            });
            console.error(`Erro: ${err}`);
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na criação do projeto',
          description:
            'Ocorreu um erro ao criar o projeto, cheque as informações e tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [module, addToast, edit_url, setUpdate, update, data]
  );

  return (
    <UnForm
      style={{ gridTemplateColumns: template }}
      initialData={data && data}
      ref={formRef}
      onSubmit={edit}
    >
      {inputData.map(input => (
        <LineItem
          style={input.style && input.style}
          key={input.data}
          id={input.data}
        >
          {getValue(input)}
        </LineItem>
      ))}
      <LineItem id="acoes">
        {loading ? (
          <Spinner />
        ) : (
          <FaCheckCircle
            style={{ color: 'var(--success-color)' }}
            onClick={() => formRef.current?.submitForm()}
          />
        )}
      </LineItem>
    </UnForm>
  );
};

export default EditInTable;
