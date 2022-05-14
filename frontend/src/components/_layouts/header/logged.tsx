import React, { SetStateAction, useCallback, useEffect, useState } from 'react';

import { FiMenu } from 'react-icons/fi';
import { FaClock, FaSignOutAlt } from 'react-icons/fa';

import Logo from 'assets/cropped-logo.png';
import UserDefault from 'assets/userDefault.png';

import { FaBell } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { formatBRDate, formatHour } from 'utils/formatData';
import { useAuth } from '../../../hooks/auth';
import {
  HeaderHolder,
  HeaderContainer,
  Separator,
  MenuHolder,
  LogoHolder,
  UserHolder,
  DateHolder,
  SignOutHolder,
  NotificationHolder,
  NotificacaoNumber,
} from './styled';

interface IProps {
  isSidebarOpened: boolean;
  setSidebarOpened: React.Dispatch<SetStateAction<boolean>>;
}

const HeaderLogged: React.FC<IProps> = props => {
  const { isSidebarOpened, setSidebarOpened } = props;

  const { signOut } = useAuth();

  const userNotificacoes: any[] = [];

  const [active, setActive] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const { usuario } = useAuth();

  const getFullDate = useCallback(() => {
    if (!active) {
      return;
    }
    const tempDate = new Date();

    setDate(tempDate);
  }, [active]);

  // useEffect(() => {
  //   document.addEventListener(
  //     'visibilitychange',
  //     () => {
  //       if (document.hidden) {
  //         setActive(false);
  //       } else {
  //         setActive(true);
  //       }
  //     },
  //     false
  //   );
  // }, []);

  process.env.NODE_ENV !== 'development' &&
    active &&
    setTimeout(getFullDate, 1000);

  return (
    <HeaderHolder isSidebarOpened={isSidebarOpened}>
      <HeaderContainer>
        <MenuHolder>
          {isSidebarOpened ? (
            <IoMdClose
              size={18}
              onClick={() => {
                setSidebarOpened(!isSidebarOpened);
              }}
            />
          ) : (
            <FiMenu
              size={18}
              onClick={() => {
                setSidebarOpened(!isSidebarOpened);
              }}
            />
          )}
        </MenuHolder>
        <Separator />
        <LogoHolder>
          <img src={Logo} alt="SmartRoad - Logo" />
        </LogoHolder>
        <UserHolder>
          <span>
            {usuario && (
              <>
                Olá, <strong>{usuario.nome}</strong>
              </>
            )}
          </span>
          <img
            src={UserDefault}
            alt={`${usuario ? usuario.nome : '-'} Avatar`}
          />
        </UserHolder>
        <Separator />
        <NotificationHolder>
          {/* <NotificacoesModal
            update={update}
            setUpdate={setUpdate}
            notificacoes={userNotificacoes}
          > */}
          <FaBell size={18} />
          <NotificacaoNumber>{userNotificacoes.length}</NotificacaoNumber>
          {/* </NotificacoesModal> */}
        </NotificationHolder>
        <Separator />
        <DateHolder>
          <FaClock size={18} />
          <span>{date && formatBRDate(date)}</span>
          <span>-</span>
          <span>{date && formatHour(date)}</span>
        </DateHolder>
        <Separator />
        <SignOutHolder>
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
          >
            <FaSignOutAlt size={18} />
          </button>
        </SignOutHolder>
      </HeaderContainer>
    </HeaderHolder>
  );
};

export default HeaderLogged;
