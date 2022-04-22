import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

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

  label {
    span {
      margin-right: 8px;
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
    background: #c53030;
    color: var(--text-color-1);

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
