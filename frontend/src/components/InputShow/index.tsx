import { FormHandles } from '@unform/core';
import Input from 'components/Input';
import { useToast } from 'hooks/toast';
import React, { SetStateAction, useCallback, useRef, useState } from 'react';
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

interface InputShowProps {
  module: string;
  module_label?: string;
  name: string;
  editUrl: string;
  id: number;
  data: any;
  style?: React.CSSProperties;
  update?: boolean;
  setUpdate?: React.Dispatch<SetStateAction<boolean>>;
}

const InputShow: React.FC<InputShowProps> = ({
  module,
  module_label,
  name,
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
  const [editing, setEditing] = useState<boolean>(false);

  const { addToast } = useToast();

  const send = useCallback(
    (dat: any) => {
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
            setEditing(false);
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
      }
    },
    [editUrl, module, module_label, addToast, id, setUpdate, update]
  );

  return (
    <Container className="inputShowHolder" ref={containerRef} style={style}>
      {editing ? (
        <FormContent initialData={data} ref={formRef} onSubmit={send}>
          <Input name={name} />
          <SendButton type="submit">
            <FaCheck />
          </SendButton>
          <CancelButton type="button" onClick={() => setEditing(false)}>
            <GrClose size={10} />
          </CancelButton>
        </FormContent>
      ) : (
        <ChildrenHolder onClick={() => setEditing(true)}>
          {children}
        </ChildrenHolder>
      )}
    </Container>
  );
};

export default InputShow;
