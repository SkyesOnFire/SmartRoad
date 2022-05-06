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

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 30px 0;

  form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const FormRow = styled.div`
  width: 100%;

  margin-bottom: 20px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const InputHolder = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  margin: 0 10px;

  &:first-of-type {
    margin-left: 0px;
  }
  &:last-of-type {
    margin-right: 0px;
  }

  .checkboxHolder {
    height: 44px;
    justify-content: center;
    align-items: flex-start;
    span {
      font-size: 1.4rem;
    }
  }

  * {
    overflow: visible;
  }

  label {
    font-size: 1.15rem;
    margin-bottom: 3px;
  }
`;

export const SaveButton = styled.button`
  margin-top: 50px;

  width: 20%;
  height: 38px;

  background-color: var(--secundary-color);
  color: var(--text-color-1);
  border: none;
  border-radius: 30px;
`;

export const ModalRoot = styled.div`
  width: 100%;
  height: 100%;
`;
