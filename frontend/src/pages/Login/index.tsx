import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';

import Input from 'components/Input';
import InputMask from 'components/Input/mask';
import Button from 'components/Button';
import { useAuth } from 'hooks/auth';
import { useToast } from 'hooks/toast';
import getValidationErrors from 'utils/getValidationErrors';
import Logo from 'assets/cropped-logo.png';

import {
  Container,
  FormHeader,
  FormBody,
  FormFooter,
  AnimatedForm,
} from './styles';

interface SignInFormData {
  cpf: string;
  senha: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string().required('CPF obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          cpf: data.cpf,
          senha: data.senha,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        console.error(err.message);

        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message
              : 'Erro na autênticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      } finally {
        setLoading(false);
      }
    },
    [signIn, addToast]
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <AnimatedForm>
          <FormHeader>
            <img src={Logo} alt="Logo" />
            <h1>Seja bem vindo!</h1>
          </FormHeader>
          <FormBody>
            <label htmlFor="cpf">CPF</label>
            <InputMask
              mask="999.999.999-99"
              icon={FiUser}
              iconSize={25}
              id="cpf"
              name="cpf"
              placeholder="Digite seu CPF"
            />
            <label htmlFor="senha">Senha</label>
            <Input
              icon={FiLock}
              iconSize={25}
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
            />
            {/* <a href="forgot">Esqueceu sua senha?</a> */}
          </FormBody>
          <FormFooter>
            <Button type="submit">
              {loading ? 'CARREGANDO...' : 'ENTRAR'}
            </Button>
          </FormFooter>
        </AnimatedForm>
      </Form>
    </Container>
  );
};

export default Login;
