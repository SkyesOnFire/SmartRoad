import styled, { css } from 'styled-components';

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

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 150px;

  overflow: visible !important;

  form {
    width: 100%;
    height: 100%;
  }

  button.buttonModal {
    width: 100%;
    height: auto;
    margin: 5px 0 10px;
    border: none;
    background: none;
    font-size: 12px;
    &:hover {
      text-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const NotificacoesHolder = styled.ul`
  width: 100%;
  height: auto;

  max-height: 450px;

  overflow: visible !important;
  overflow-y: auto !important;

  padding-right: 10px;

  list-style: none;

  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 0 0 0 30px;
`;

interface INotificao {
  hasLink: boolean;
}

export const Notificacao = styled.li<INotificao>`
  width: 100%;
  height: 75px;

  background: #fefefe;

  border-bottom: 1px solid var(--main-color);
  border-radius: 5px;

  overflow: visible !important;

  margin: 20px 0;

  padding: 10px 15px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    ${props =>
      props.hasLink &&
      css`
        cursor: pointer;
        background: #fafafa;
      `}
  }

  div.column1,
  div.column2,
  div.column3 {
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    p,
    span,
    strong {
      margin: 0;
    }

    strong {
      font-weight: 600;
      font-size: 16px;
    }
  }

  div.column1 {
    width: 50%;
    align-items: flex-start;

    p {
      margin-top: 5px;

      font-weight: 400;
      font-size: 12px;

      flex: 1 1;

      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      text-align: justify;
    }
  }

  div.column2 {
    width: 50%;
    align-items: flex-end;

    p {
      font-weight: 500;
      font-size: 14px;

      flex: 1 1;

      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

  div.column3 {
    width: 40px;

    &,
    button {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    button {
      width: 100%;
      height: 100%;
    }
  }

  &:first-of-type {
    margin-top: 0px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`;
