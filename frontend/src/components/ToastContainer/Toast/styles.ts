import styled, { css } from 'styled-components';

import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'error' | 'info';
  hasdescriptioncode: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: var(--info-color);
  `,
  success: css`
    background: #e6fffa;
    color: var(--text-color-2);
  `,
  error: css`
    background: #fddede;
    color: var(--error-color);
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;

  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px var(--shadow-color);

  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
    strong {
      color: inherit;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 15px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasdescriptioncode &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
      }
    `}
`;
