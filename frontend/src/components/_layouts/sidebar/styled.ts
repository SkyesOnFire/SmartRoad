import styled, { css } from 'styled-components';

interface Sidebar {
  open: boolean;
}

export const SidebarHolder = styled.aside<Sidebar>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;

  ${props =>
    props.open
      ? css`
          width: calc(var(--layout-items-size) * 2);
        `
      : css`
          width: 0px;
        `}

  height: 100vh;

  background: var(--sidebar-bg);
  box-shadow: 0 0 10px var(--shadow-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  overflow-x: hidden;
  transition: 0.5s;

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

export const Nav = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const NavItem = styled.button`
  width: 100%;
  height: 85px;
  color: var(--text-sidebar);

  border-bottom: 1px solid var(--text-sidebar);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    margin-top: 5px;
    line-height: 1;
    font-size: 0.9rem;
  }
`;
