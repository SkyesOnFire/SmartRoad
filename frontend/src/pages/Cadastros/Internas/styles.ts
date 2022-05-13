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

export const TitleHolder = styled.h2`
  width: 100%;
  padding: 0 15px 10px;

  border-bottom: 1px solid rgb(175 175 175 / 30%);

  color: var(--text-color-2);
  font-size: 2.4rem;
  font-weight: 500;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 8px 15px;
    font-weight: 300;
    font-size: 1.2rem;
    text-decoration: none;
    color: var(--text-color-2);
    border-radius: 30px;
    border: 1px solid var(--text-color-2);
    transition: 0.3s all;
    box-shadow: 0 0 4px var(--shadow-color);
    background: transparent;

    &:hover {
      padding: 8px 20px;
      box-shadow: 0 0 8px var(--shadow-color);
    }
  }
`;

export const FilterHolder = styled.div`
  width: auto;
  height: auto;
  padding: 10px 0;

  overflow-x: scroll !important;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  form {
    margin: 0 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 10px;
    form {
      height: auto;
      flex-direction: column;
    }
  }
`;

export const FilterItemHolder = styled.div`
  height: 70px;
  width: 100%;

  flex: 1 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  margin: 0 15px;

  &.select {
    min-width: 200px;
  }

  &:first-of-type {
    margin-left: 0px;
  }
  &:last-of-type {
    margin-right: 0px;
  }

  &.submit {
    height: 70px;
    min-width: auto;
  }

  label {
    height: 40%;
    font-size: 1.2rem;
    margin-bottom: 3px;
  }
  div.selectHolder,
  div.inputHolder,
  button.buttonHolder {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60%;

    border-radius: 15px;

    border: 0;
    border-bottom: 1px solid var(--quaternary-color);

    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }

    input,
    select {
      font-size: 1.2rem;
      &::placeholder {
        font-size: 1.2rem;
      }
    }
  }

  button.buttonHolder {
    padding: 0 15px;
    border: 0;
  }

  @media (max-width: 768px) {
    margin: 10px 0px 0px;

    &:first-of-type {
      margin-top: 0px;
    }
  }
`;

export const ListHolder = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  div.container {
    padding: 15px;
  }
`;

export const IdHolder = styled.div`
  padding: 5px 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background-color: var(--secundary-color);

  svg {
    margin-right: 3px;
  }

  svg,
  & {
    color: var(--text-color-1);
  }
`;

export const CancelarHolder = styled.div`
  width: 25px;
  height: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background-color: var(--error-color);

  svg {
    color: var(--text-color-1);
  }
`;
