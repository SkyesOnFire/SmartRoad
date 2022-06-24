import React from 'react';
import { useHistory } from 'react-router-dom';

import { AiOutlineHome } from 'react-icons/ai';
import { FaCar, FaMapMarkedAlt, FaTag, FaWpforms } from 'react-icons/fa';

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
            history.push('/veiculos');
          }}
          type="button"
          id="tags"
        >
          <FaTag size={20} />
          <span>Tags</span>
        </NavItem>
        <NavItem
          onClick={() => {
            history.push('/veiculos');
          }}
          type="button"
          id="veiculos"
        >
          <FaCar size={20} />
          <span>Veículos</span>
        </NavItem>
        <NavItem
          onClick={() => {
            history.push('/locais');
          }}
          type="button"
          id="locais"
        >
          <FaMapMarkedAlt size={20} />
          <span>Locais</span>
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
