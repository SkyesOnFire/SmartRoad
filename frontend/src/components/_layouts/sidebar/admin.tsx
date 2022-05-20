import React from 'react';
import { useHistory } from 'react-router-dom';

import { GiMoneyStack } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { FaTasks, FaWpforms } from 'react-icons/fa';
import { HiOutlineClipboardList } from 'react-icons/hi';

import { BsArrowReturnLeft } from 'react-icons/bs';
import { SidebarHolder, Nav, NavItem } from './styled';

interface IProps {
  isOpened: boolean;
}

const Sidebar: React.FC<IProps> = props => {
  const history = useHistory();

  const { isOpened } = props;

  return (
    <SidebarHolder open={isOpened}>
      <Nav>
        <NavItem
          onClick={() => {
            history.push('/');
          }}
          type="button"
          id="inicio"
        >
          <AiOutlineHome size={20} />
          <span>Início</span>
        </NavItem>
        <NavItem
          onClick={() => {
            history.push('/cadastros');
          }}
          type="button"
          id="cadastros"
        >
          <FaWpforms size={20} />
          <span>Cadastros</span>
        </NavItem>
      </Nav>
      <NavItem
        onClick={() => {
          history.goBack();
        }}
        type="button"
        id="back"
      >
        <BsArrowReturnLeft size={20} />
      </NavItem>
    </SidebarHolder>
  );
};

export default Sidebar;
