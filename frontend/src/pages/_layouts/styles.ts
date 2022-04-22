import styled, { css } from 'styled-components';

interface IContainer {
  isSidebarOpen: boolean;
}

export const Wrapper = styled.div`
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Container = styled.div<IContainer>`
  height: calc(100vh - var(--layout-items-size));

  transition: 0.5s;

  ${props =>
    props.isSidebarOpen
      ? css`
          width: calc(100% - var(--layout-items-size));
        `
      : css`
          width: 100%;
        `}

  margin-top: var(--layout-items-size);

  padding: 2%;

  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 4% 2% 2%;
    width: 100%;
    margin-top: var(--layout-mobile-items-size);
  }

  * {
    overflow: visible;
  }
`;
