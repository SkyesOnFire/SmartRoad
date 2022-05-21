import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 2%;
  }
`;

export const Title = styled.h1`
  width: 100%;
  padding: 0 15px 5px;
  margin-bottom: 0;

  border-bottom: 1px solid rgb(175 175 175 / 30%);

  color: var(--text-color-2);
  font-size: 2.4rem;
  font-weight: 600;
`;

export const Desc = styled.span`
  width: 100%;
  padding: 5px 15px 0;

  color: var(--text-color-3);
  font-size: 1.1rem;
  font-weight: 300;

  b {
    font-weight: 600;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding: 30px 10px;

  form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
`;
