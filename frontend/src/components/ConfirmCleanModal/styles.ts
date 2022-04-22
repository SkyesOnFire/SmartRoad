import styled from 'styled-components';

export const Title = styled.div`
  width: 100%;
  height: 50px;

  border-bottom: 1px solid #bbb;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
`;

export const Desc = styled.p`
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  margin: 50px 0;
`;

export const ConfirmButton = styled.button`
  width: 200px;
  height: 50px;

  background-color: var(--info-color);
  color: var(--text-color-1);
  border: none;
  border-radius: 30px;

  &.error {
    background-color: var(--error-color);
  }
  &.success {
    background-color: var(--success-color);
  }
`;

export const ModalRoot = styled.div`
  width: 100%;
  height: 100%;
`;
