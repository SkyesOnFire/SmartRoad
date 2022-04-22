import Button from 'components/Button';
import styled, { css } from 'styled-components';
import { Form } from '@unform/web';

interface FormProps {
  columns?: string;
  gridTemplate?: string;
}

export const UnForm = styled(Form)<FormProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FormContainer = styled.div<FormProps>`
  width: 100%;
  height: 100%;

  display: grid;
  justify-content: center;
  align-items: start;
  gap: 20px;

  grid-template-columns: 100%;

  ${props =>
    css`
      grid-template-columns: ${props.columns ? props.columns : '100%'};
    `}

  ${props =>
    css`
      grid-template: ${props.gridTemplate ? props.gridTemplate : '100%'};
    `}


  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }

  padding: 30px 10px;
`;

export const FormRow = styled.div`
  width: 100%;
  height: 100%;

  margin-bottom: 20px;
  padding: 0 15px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 0;
  }
`;

export const InputHolder = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  .checkboxHolder {
    height: 44px;
    justify-content: center;
    align-items: flex-start;
    span {
      font-size: 1.4rem;
    }
    input[type='checkbox'] {
      transform: scale(1.2);
      margin-right: 10px;
    }
  }

  label {
    font-size: 1.15rem;
    margin-bottom: 3px;
  }

  @media (max-width: 768px) {
    width: 100% !important;
    margin: 10px 0;
  }
`;

export const SaveButton = styled(Button)`
  margin-top: 100px;

  width: calc(50% + 30px);
  height: 50px;

  background-color: var(--primary-color);
  color: var(--text-color-1);
  border: none;
  border-radius: 30px;
`;
