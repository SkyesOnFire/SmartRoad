import React, { SetStateAction, useCallback, useEffect, useState } from 'react';

import { FiMenu } from 'react-icons/fi';
import { FaCheck, FaClock, FaSignOutAlt } from 'react-icons/fa';

import Logo from 'assets/cropped-logo.png';
import UserDefault from 'assets/userDefault.png';

import { differenceInMinutes } from 'date-fns';
import { useHistory } from 'react-router';
import { INotificacoesDTO } from 'utils/DTOS';
import { useToast } from 'hooks/toast';
import api from 'services/api';
import { AxiosError, AxiosResponse } from 'axios';
import NotificacoesModal from 'components/NotificacoesModal';
import Spinner from 'components/Spinner';
import { FaBell, FaExclamationTriangle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { formatBRDate, formatHour } from 'utils/formatData';
import { useAuth } from '../../../hooks/auth';
import {
  HeaderHolder,
  Header1Holder,
  Separator,
  MenuHolder,
  LogoHolder,
  UserHolder,
  DateHolder,
  SignOutHolder,
  Header2Holder,
  TasksHolder,
  NotificationHolder,
  NotificacaoNumber,
  WarningTaskInfo,
} from './styled';

interface IProps {
  isSidebarOpened: boolean;
  setSidebarOpened: React.Dispatch<SetStateAction<boolean>>;
}

interface ITarefasInfo {
  atrasadas: number;
  aVencer: number;
}

const HeaderLogged: React.FC<IProps> = props => {
  const { isSidebarOpened, setSidebarOpened } = props;

  const history = useHistory();
  const { signOut } = useAuth();

  const [userNotificacoes, setUserNotificacoes] = useState<INotificacoesDTO[]>(
    []
  );
  const [tarefasInfo, setTarefasInfo] = useState<ITarefasInfo | undefined>(
    undefined
  );
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { addToast } = useToast();
  const [lastUpdate, setLastUpdate] = useState<Date | undefined>(undefined);

  const { usuario } = useAuth();

  const getUserNotificacoes = useCallback(async () => {
    if (
      !active ||
      (lastUpdate && differenceInMinutes(new Date(), lastUpdate) < 1)
    ) {
      return;
    }
    setLastUpdate(new Date());

    await api
      .get(`/notificacoes/notificacao-usuario`)
      .then(async (res: AxiosResponse) => {
        if (userNotificacoes.length !== res.data.length) {
          setUserNotificacoes(res.data);
        }
      })
      .catch((err: AxiosError) => {
        if (
          err.response &&
          typeof err.response?.data.message === 'string' &&
          err.response.data.message.includes('Token de autenticação inválido')
        ) {
          signOut();
        }
        console.error(`Erro: ${err}`);
      });
  }, [lastUpdate, active, userNotificacoes.length, signOut, update]);

  useEffect(() => {
    getUserNotificacoes();
  }, [getUserNotificacoes]);

  const getTarefasInfo = useCallback(async () => {
    setLoading(true);

    await api
      .get(`/tarefas/infos-user`)
      .then(async (res: AxiosResponse) => {
        setTarefasInfo(res.data);
      })
      .catch((err: AxiosError) => {
        if (
          err.response &&
          typeof err.response?.data.message === 'string' &&
          err.response.data.message.includes('Token de autenticação inválido')
        ) {
          signOut();
        }
        addToast({
          type: 'error',
          title:
            typeof err.response?.data.message === 'string'
              ? err.response?.data.message
              : 'Ocorreu um erro',
          description:
            'Ocorreu um erro ao buscar as informações das suas tarefas, recarregue a página.',
        });
        console.error(`Erro: ${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [addToast]);

  useEffect(() => {
    getTarefasInfo();
  }, [getTarefasInfo]);

  const getFullDate = useCallback(() => {
    if (!active) {
      return;
    }
    const tempDate = new Date();

    setDate(tempDate);
  }, [active]);

  useEffect(() => {
    document.addEventListener(
      'visibilitychange',
      () => {
        if (document.hidden) {
          setActive(false);
        } else {
          setActive(true);
        }
      },
      false
    );
  }, []);

  process.env.NODE_ENV !== 'development' &&
    active &&
    setTimeout(getFullDate, 1000);

  return (
    <HeaderHolder isSidebarOpened={isSidebarOpened}>
      <Header1Holder>
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
          <img src={Logo} alt="In Natura - Logo" />
        </LogoHolder>
        <UserHolder>
          <span>
            {loading ? (
              <strong>
                <Spinner size={15} />
              </strong>
            ) : (
              usuario && (
                <>
                  Olá, <strong>{usuario.nome}</strong>
                </>
              )
            )}
          </span>
          <img
            src={UserDefault}
            alt={`${usuario ? usuario.nome : '-'} Avatar`}
          />
        </UserHolder>
        <Separator />
        <NotificationHolder>
          <NotificacoesModal
            update={update}
            setUpdate={setUpdate}
            notificacoes={userNotificacoes}
          >
            <FaBell size={18} />
            <NotificacaoNumber>{userNotificacoes.length}</NotificacaoNumber>
          </NotificacoesModal>
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
      </Header1Holder>
      <Header2Holder>
        <TasksHolder
          className={tarefasInfo && tarefasInfo.atrasadas > 0 ? 'warn' : ''}
        >
          {tarefasInfo && tarefasInfo.atrasadas > 0 ? (
            <FaExclamationTriangle size={25} />
          ) : (
            <FaCheck size={25} />
          )}
          <span>
            {tarefasInfo ? tarefasInfo.atrasadas : 0} tarefas atrasadas
          </span>
        </TasksHolder>
        <WarningTaskInfo>
          {tarefasInfo ? (
            tarefasInfo.aVencer !== 0 ? (
              tarefasInfo.aVencer === 1 ? (
                <strong>
                  {tarefasInfo.aVencer} tarefa a ser vencida essa semana
                </strong>
              ) : (
                <strong>
                  {tarefasInfo.aVencer} tarefas a serem vencidas essa semana
                </strong>
              )
            ) : (
              <strong>Nenhuma tarefa a ser vencida</strong>
            )
          ) : (
            <strong>Nenhuma tarefa a ser vencida</strong>
          )}
          <button type="button" onClick={() => history.push('/tarefas')}>
            Ir para tarefas
          </button>
        </WarningTaskInfo>
      </Header2Holder>
    </HeaderHolder>
  );
};

export default HeaderLogged;
