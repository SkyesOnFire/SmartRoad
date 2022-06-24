import { createGlobalStyle } from 'styled-components';
import 'typeface-montserrat';

export default createGlobalStyle`
  :root {
    --primary-color: #008AED;
    --secundary-color: #f58634;
    --tertiary-color: #9fbcdf;
    --quaternary-color: #6599CC;

    --main-color: var(--primary-color);

    --error-color: #f53434;
    --success-color: #61f534;
    --info-color: #346ff5;
    --warning-color: #f5d334;

    --dark-grey: #222;
    --darker-grey: #1B1B1B;
    --black: #111;
    --light-grey: #cfcfcf;

    --text-color-0: #fff;
    --text-color-1: #fafafa;
    --text-color-2: #333;
    --text-color-3: #000;

    --main-bg-color: #fafbfd;
    --box-bg-color: #fff;
    --hover-color: var(--main-color);

    --separator-table: var(--light-grey);

    --shadow-color: rgb(82 63 49 / 30%);
    --primary-shadow: rgb(102 178 78 / 30%);
    --secundary-shadow: rgb(245 134 52 / 30%);
    --tertiary-shadow: rgb(159 188 223 / 30%);
    --quaternary-shadow: rgb(82 63 49 / 30%);

    --layout-items-size: 4.5rem;
    --layout-mobile-items-size: 3rem;

    --sidebar-bg: var(--quaternary-color);
    --text-sidebar: var(--text-color-0);

    --header-bg: #fff;

    --responsive-mobile-tablet: 768px;

    font-size: 14px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    text-overflow: ellipsis;
    overflow: hidden;

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: rgba(0,0,0,0.0);
    }

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: rgba(0,0,0,0.0);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }

    @media (max-width: 768px) {
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        display: none;
      }
    }
  }

  html {
    overflow: auto;
  }

  body {
    background: var(--main-bg-color);
    color: var(--text-color-2);
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  body, input, button {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    color: var(--main-color);
    line-height: 1;
  }

  ul {
    line-height: 100% !important;
  }

  button {
    border: 0px;
    background: none;
  }

  img {
    width: 100%;
  }

  a {
    color: var(--main-color);
  }

  button, a {
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ModalStyle = createGlobalStyle`
  .modalAntd {
    width: 60% !important;
    @media (max-width: 768px) {
      width: 90% !important;
    }
    @media (max-width: 1366px) {
      width: 70% !important;
    }
    .ant-modal-content {
      background: var(--box-bg-color);
      border-top: 2px solid var(--primary-color);
      border-radius: 15px !important;
      padding: 0 15px;
      height: 70%;

      * {
        overflow: visible;
      }
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
          color: var(--text-color-3);
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

    &.error {
      .ant-modal-content {
        border-top: 2px solid var(--error-color);
      }
    }
    &.success {
      .ant-modal-content {
        border-top: 2px solid var(--success-color);
      }
    }
    &.info {
      .ant-modal-content {
        border-top: 2px solid var(--info-color);
      }
    }
    &.warning {
      .ant-modal-content {
        border-top: 2px solid var(--warning-color);
      }
    }
    &.secundary {
      .ant-modal-content {
        border-top: 2px solid var(--secundary-color);
      }
    }
    &.tertiary {
      .ant-modal-content {
        border-top: 2px solid var(--tertiary-color);
      }
    }
    &.quaternary {
      .ant-modal-content {
        border-top: 2px solid var(--quaternary-color);
      }
    }
  }
`;
