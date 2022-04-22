import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface IProps {
  row?: boolean;
}

export const Container = styled.div<IProps>`
  width: 100%;
  height: 100%;
  max-height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  ${props =>
    props.row &&
    css`
      flex-direction: row;
      justify-content: flex-start !important;
      align-items: center !important;

      span {
        margin-right: 8px;
      }
    `}

  input {
    text-align: left;
    border: 0;
    color: var(--text-color-2);
    font-size: 18px;
    background: transparent;
    margin-right: 5px;

    &::placeholder {
      color: var(--text-color-3);
      font-size: 18px;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: var(--error-color);
    color: var(--text-color-1);

    &::before {
      border-color: var(--error-color) transparent;
    }
  }
`;
