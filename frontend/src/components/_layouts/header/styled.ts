import styled, { css } from 'styled-components';

interface Header {
  isSidebarOpened: boolean;
}

export const HeaderHolder = styled.header<Header>`
  position: fixed;
  right: 0;
  top: 0;

  ${props =>
    props.isSidebarOpened
      ? css`
          width: calc(100vw - var(--layout-items-size));
        `
      : css`
          width: 100vw;
        `}

  height: var(--layout-items-size);

  background: var(--header-bg);
  box-shadow: 0 0 10px var(--shadow-color);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  z-index: 10;

  overflow-x: hidden;
  transition: 0.5s;

  @media (max-width: 768px) {
    width: 100%;
    height: var(--layout-mobile-items-size);
    padding: 0px;
  }
`;

export const Header1Holder = styled.div`
  height: 50%;
  width: 100%;

  box-shadow: 0 0 5px var(--shadow-color);

  padding-right: 50px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 768px) {
    height: 100%;
    padding-right: 0;
  }
`;

export const Separator = styled.span`
  height: 10px;
  width: 1px;

  background: var(--light-grey);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuHolder = styled.div`
  height: 100%;

  padding: 0 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: var(--text-color);
    transition: 0.3s all;

    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    position: absolute;
    left: 25px;
  }
`;

export const LogoHolder = styled.div`
  height: 100%;
  width: 100%;
  flex: 1 1;

  padding: 0 25px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    height: 70%;
    width: auto;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const UserHolder = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 0 25px;

  span {
    strong {
      font-weight: 600;
      color: var(--text-color);
    }
  }

  img {
    height: 30px;
    width: 30px;

    margin-left: 10px;

    object-fit: cover;
    object-position: center center;

    background: var(--light-grey);
    border: 1px solid var(--light-grey);
    border-radius: 50%;

    background: #fff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NotificationHolder = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 25px;

  button {
    height: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: -10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NotificacaoNumber = styled.span`
  width: 15px;
  height: 15px;

  background-color: red;

  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 11px;

  border-radius: 50%;

  margin: -15px 0 0 -5px;
`;

export const DateHolder = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 0 25px;

  span {
    color: var(--text-color);
    font-size: 1rem;
    line-height: 1;
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SignOutHolder = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 25px;

  button {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: var(--text-color);
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Header2Holder = styled.div`
  height: 50%;
  width: 100%;

  padding-right: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const TasksHolder = styled.div`
  height: 100%;
  width: auto;
  min-width: 250px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--main-color);

  &.warn {
    background-color: var(--error-color);
  }

  svg,
  span {
    color: var(--text-color-1);
  }

  span {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const WarningTaskInfo = styled.div`
  height: 100%;
  flex: 1 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 0 0 0 15px;

  strong {
    font-size: 1.2rem;
    color: var(--text-color-2);
    font-weight: 600;

    text-transform: uppercase;
  }

  button {
    font-size: 0.95rem;
    color: var(--text-color-2);
    font-weight: 300;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
