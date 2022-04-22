import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  noMinHeight?: boolean;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<ContainerProps>`
  width: 100%;

  ${props =>
    !props.noMinHeight &&
    css`
      min-height: 300px;
    `}

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 300;
`;

export const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 2s linear infinite;

  color: var(--main-color);
`;
