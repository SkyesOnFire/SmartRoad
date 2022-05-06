import { FormHandles } from '@unform/core';
import Input from 'components/Input';
import { useToast } from 'hooks/toast';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaCheck } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import api from 'services/api';

import {
  Container,
  ChildrenHolder,
  FormContent,
  SendButton,
  CancelButton,
} from './styles';

interface OnChangeSubmitProps {
  module: string;
  module_label?: string;
  editUrl: string;
  id: number;
  data: any;
  style?: React.CSSProperties;
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
  initChanged: number;
  changed: number;
  setChanged: React.Dispatch<SetStateAction<number>>;
}

const OnChangeSubmit: React.FC<OnChangeSubmitProps> = ({
  module,
  module_label,
  initChanged,
  changed,
  setChanged,
  editUrl,
  id,
  data,
  style,
  update,
  setUpdate,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const send = useCallback(
    (dat: any) => {
      if (initChanged === changed) {
        return;
      }
      try {
        api
          .put(`${editUrl}/${id}`, dat)
          .then(res => {
            addToast({
              type: 'success',
              title: `${module_label || module} editado(a) com sucesso`,
            });
            if (setUpdate) {
              setUpdate(!update);
            }
          })
          .catch(err => {
            addToast({
              type: 'error',
              title: `Erro ao editar o(a) ${module}`,
            });
            console.error(`Erro: ${err}`);
          });
      } catch (err) {
        addToast({
          type: 'error',
          title: `Erro na edição do(a) ${module_label || module}`,
          description: `Ocorreu um erro ao editar o(a) ${
            module_label || module
          }, cheque as informações e tente novamente.`,
        });
      } finally {
        setChanged(initChanged);
      }
    },
    [
      editUrl,
      module,
      module_label,
      addToast,
      id,
      setUpdate,
      update,
      initChanged,
      changed,
      setChanged,
    ]
  );

  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    send(formRef.current.getData());
  }, [send]);

  return (
    <Container
      className="onChangeSubmitHolder"
      ref={containerRef}
      style={style}
    >
      <FormContent initialData={data} ref={formRef} onSubmit={send}>
        {children}
      </FormContent>
    </Container>
  );
};

export default OnChangeSubmit;
