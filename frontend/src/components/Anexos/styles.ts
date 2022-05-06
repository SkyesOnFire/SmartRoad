import styled, { createGlobalStyle } from 'styled-components';

import Button from '../Button';

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

export const AnexosList = styled.div`
  width: 90%;
  height: 300px;
  padding: 15px 0;
  overflow: auto !important;
  overflow-x: hidden !important;
  overflow-y: scroll !important;
`;

export const Indice = styled.div`
  width: 100%;
  padding: 2px 10px;
  border-bottom: 1px solid #bbb;
  line-height: 1;

  font-weight: 600;
  color: #333;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  div.nome {
    width: 45%;
  }
  div.tipo {
    width: 35%;
  }
  div.visualizar {
    width: 20%;
  }
`;

export const Lista = styled.div`
  width: 100%;
  padding: 10px 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Linha = styled.div`
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #bbb;
  padding: 0 10px;

  font-size: 14px;
  font-weight: 400;
  color: #333;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  overflow: visible !important;

  div.nome {
    width: calc(45%);
    overflow: hidden;
    white-space: nowrap;
    line-height: 1;
    height: 14px;
    padding-right: 5px;

    overflow: visible !important;
  }
  div.tipo {
    width: calc(35% - 5px);
    overflow: hidden;
    line-height: 1;
    height: 14px;
    padding-right: 5px;

    overflow: visible !important;
  }
  div.visualizar {
    width: calc(20% - 5px);

    overflow: visible !important;
    > svg {
      margin-top: 7px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;

export const AnexosCriar = styled.div`
  width: 100%;
  height: 350px;
  border-top: 1px solid #bbb;
  padding: 10px;
  form {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  strong {
    width: 100%;
    height: 50px;

    display: flex;
    justify-content: flex-start;
    align-items: left;
    font-size: 24px;
    font-weight: 700;
  }
  @media (max-width: 480px) {
    height: 400px;
    form {
      flex-direction: column;
    }
  }
`;

export const FormHolder = styled.div`
  width: 50%;
  height: auto;
  .inputHolder,
  .selectHolder {
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    input {
      &::placeholder {
        font-size: 14px;
      }
    }
  }
  @media (max-width: 480px) {
    width: 100% !important;
    margin-top: 30px;
  }
`;

export const FormButtonHolder = styled.div`
  width: calc(100% - 39px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 80px;
  @media (max-width: 480px) {
    bottom: 30px;
  }
`;

export const FormButton = styled(Button)`
  width: 50%;
  font-size: 20px;
  padding: 10px 0;
  border-radius: 30px;
  letter-spacing: 0px;
`;

export const Upload = styled.div`
  width: 50%;
  height: 100%;

  margin-top: -10px;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    width: 100% !important;
    margin: 0;
  }
  .inputHolder {
    width: 60%;
    border: 0px;
    padding: 0px;
    input {
      width: 100%;
      &::-webkit-file-upload-button {
        display: none;
      }
      &::before {
        content: 'Upload';

        display: flex;
        justify-content: center;
        align-items: center;

        background: #fff;
        border: 1px solid var(--main-color);
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
        width: 100%;
        height: 100px;
        text-align: center;
        transition: 0.3s all;
      }
      &:hover::before {
        opacity: 0.7;
      }
      &:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
      }
    }
  }
`;

export const ModalCSS = createGlobalStyle`
  .modal {
    width: 50% !important;
    @media (max-width: 480px) {
      width: 90% !important;
    }
    .ant-modal-content {
      background: #fff;
      border-radius: 15px !important;
      padding: 0 15px;
      height: 70%;
      .ant-modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        .select {
          margin: 0 0 5% 0;
          border: 0;
          border-bottom: 1px solid #ccc;
          border-radius: 10px;
          width: 80%;
          padding: 5% 5%;
          color: #777;
          font-size: 16px;
          transition: 0.3s all;
          &:hover,
          &:active,
          &:focus {
            outline: none;
            border-bottom: 1px solid #777;
          }
          .ant-select-selector {
            border: 0px;
            &:hover,
            &:active,
            &:focus {
              outline: none;
              border: 0;
            }
          }
        }
      }
    }
  }
`;

export const ModalRoot = styled.div`
  width: 100%;
  height: 100%;
`;
