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

export const ListHolder = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  div.container {
    padding: 15px;
  }
`;

export const ModulesHolder = styled.ul`
  width: 100%;
  height: auto;

  padding: 10px;

  overflow-y: scroll !important;
  overflow-x: hidden !important;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Module = styled.li`
  width: 100%;
  height: 40px;

  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  border-left: 1px solid var(--main-color);

  margin: 0 10px 5px;
  padding: 10px;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 5px var(--shadow-color);

  span {
    margin-left: 10px;
    text-align: left;
    font-size: 16px;
  }
  span.arrowRight {
    flex: 1 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  transition: 0.3s all;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 8px var(--shadow-color);
    border-left: 2px solid var(--main-color);
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
