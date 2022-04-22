import { Form } from '@unform/web';
import styled, { css } from 'styled-components';

interface ContainerProps {
  key?: string;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--text-color-3);

  flex: 1 1;
`;

export const ChildrenHolder = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  flex: 1 1;
`;

export const FormContent = styled(Form)`
  width: 100%;
  height: 100%;
  flex: 1 1;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .inputHolder {
    width: 100%;
    box-shadow: none;
    background: transparent;
    padding: 0px;
    height: 100%;
    border: 2px solid #333;
    padding: 5px 8px;

    flex: 1 1;
  }
`;

export const SendButton = styled.button`
  width: 30px;
  height: 30px;

  margin-left: 10px;
  border-radius: 50%;
  background-color: var(--success-color);
  box-shadow: 0 0 4px var(--shadow-color);

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #fff;
  }
`;

export const CancelButton = styled.button`
  width: 20px;
  height: 100%;

  margin-left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #333;
  }
`;
