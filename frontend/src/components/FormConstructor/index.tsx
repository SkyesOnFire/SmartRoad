import { FormHandles, SubmitHandler } from '@unform/core';
import React, { useCallback } from 'react';
import { ISelectDTO } from 'utils/DTOS';
import { v4 } from 'uuid';

import Input from 'components/Input';
import Select from 'components/Select';
import Textarea from 'components/Input/textarea';
import Checkbox from 'components/Checkbox';
import InputCurrency from 'components/Input/currency';
import PhoneMaskedInput from 'components/Input/phone-mask';
import MaskedInput from 'components/Input/mask';

import BoxContainer from 'components/BoxContainer';
import Spinner from 'components/Spinner';
import {
  UnForm,
  FormContainer,
  FormRow,
  InputHolder,
  SaveButton,
} from './styles';

export interface IInput {
  name: string;
  label: string;
  tipo:
    | 'input'
    | 'textarea'
    | 'mask'
    | 'select'
    | 'checkbox'
    | 'phone'
    | 'currency';
  type?: string;
  required?: boolean;
  selectData?: ISelectDTO[];
  mask?: string | Array<string | RegExp>;
  style?: React.CSSProperties;
  marked?: boolean;
  className?: string;
  onBlurFnc?: (e: any) => void;
}

export interface ISaveBtn {
  label: string;
  style?: React.CSSProperties;
  loading: boolean;
}

interface IProps {
  inputs: IInput[];
  submitFnc: SubmitHandler<any>;
  formRef: React.Ref<FormHandles> | undefined;
  saveBtn: ISaveBtn;
  formStyle?: React.CSSProperties;
  formColumns?: string;
  color?: 'primary' | 'secundary' | 'tertiary' | 'quaternary';
  initialData?: any;
  readonly?: boolean;
}

const FormConstructor: React.FC<IProps> = props => {
  const {
    inputs,
    submitFnc,
    formRef,
    saveBtn,
    formStyle,
    formColumns,
    color,
    initialData,
    readonly,
  } = props;

  const InputBuilder = useCallback(
    (input: IInput) => {
      switch (input.tipo) {
        case 'input':
          return (
            <Input
              type={input.type}
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              readonly={readonly}
              onBlur={input.onBlurFnc}
              // required={input.required}
            />
          );
        case 'textarea':
          return (
            <Textarea
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              readonly={readonly}
              onBlur={input.onBlurFnc}
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
              readonly={readonly}
              onBlur={input.onBlurFnc}
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
              readonly={readonly}
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
                  marked: input.marked,
                },
              ]}
              readOnly={readonly}
            />
          );
        case 'phone':
          return (
            <PhoneMaskedInput
              mask=""
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              readonly={readonly}
              // required={input.required}
            />
          );
        case 'currency':
          return (
            <InputCurrency
              style={input.style}
              placeholder={`Digite aqui o(ª) ${input.label.toLocaleLowerCase()}`}
              name={input.name}
              readonly={readonly}
              // required={input.required}
            />
          );
        default:
          break;
      }
    },
    [readonly]
  );

  return (
    <BoxContainer borderColor={color} style={{ marginTop: '30px' }}>
      <UnForm
        initialData={initialData && initialData}
        style={formStyle}
        ref={formRef}
        onSubmit={submitFnc}
      >
        <FormContainer columns={formColumns}>
          {inputs.map(input => (
            <InputHolder key={`${input.name}-${input.label}-${input.tipo}`}>
              {input.tipo !== 'checkbox' && (
                <label htmlFor={input.name}>
                  {input.label}
                  {input.required && '*'}
                </label>
              )}
              {InputBuilder(input)}
            </InputHolder>
          ))}
        </FormContainer>
        <FormRow>
          <InputHolder style={{ alignItems: 'center' }}>
            <SaveButton
              disabled={saveBtn.loading}
              type="submit"
              style={saveBtn.style}
            >
              {saveBtn.loading ? <Spinner size={15} /> : saveBtn.label}
            </SaveButton>
          </InputHolder>
        </FormRow>
      </UnForm>
    </BoxContainer>
  );
};

export default FormConstructor;
