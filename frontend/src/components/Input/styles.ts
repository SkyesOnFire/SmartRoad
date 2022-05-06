import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled?: boolean;
  isErrored: boolean;
  readonly: boolean;
  clean?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 38px;
  padding: 20px 16px;
  box-shadow: 0 0 4px var(--shadow-color);
  background: var(--box-bg-color);
  display: flex;
  align-items: center;
  border-bottom: 2px solid #777;
  border-radius: 8px;
  color: var(--text-color-3);

  ${props =>
    props.clean &&
    css`
      height: auto;
      padding: 0px;
      box-shadow: none;
      background: transparent;
      border-bottom: none;
      border-radius: 8px;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--error-color);
    `}
  ${props =>
    props.isFocused &&
    css`
      color: var(--main-color);
      border-color: var(--main-color);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--main-color);
    `}
  ${props =>
    props.readonly &&
    css`
      border-color: #777;
      background-color: #eee;
      color: rgba(0, 0, 0, 20%);
    `}

  &.textareaHolder {
    padding: 10px;
    height: auto;
  }

  input,
  textarea {
    flex: 1;
    text-align: left;
    border: 0;
    color: var(--text-color-2);
    font-size: 1.3rem;
    background: transparent;
    &::placeholder {
      color: var(--text-color-3);
      font-size: 1.3rem;
    }
    ${props =>
      props.readonly &&
      css`
        color: rgba(0, 0, 0, 50%);
      `}

    &::-webkit-datetime-edit {
      flex: none;
      width: auto;
    }
    &::-webkit-calendar-picker-indicator {
      margin: 0px;
      flex: none;
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
