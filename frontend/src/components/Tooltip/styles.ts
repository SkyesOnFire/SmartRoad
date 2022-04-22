import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    text-align: center;
    background: var(--main-color);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    right: 0%;
    transform: translateX(2%);
    width: 200px;
    color: var(--text-color-2);

    &::before {
      border-style: solid;
      border-color: var(--main-color) transparent;
      border-width: 6px 6px 0 6px;
      content: '';
      top: 100%;
      position: absolute;
      right: 0%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;
