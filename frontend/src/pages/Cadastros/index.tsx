import React from 'react';
import { useHistory } from 'react-router';

import { FaArrowRight, FaUser } from 'react-icons/fa';

import {
  Container,
  TitleHolder,
  ListHolder,
  ModulesHolder,
  Module,
} from './styles';

const Projeto: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <TitleHolder>Cadastros:</TitleHolder>
      <ListHolder>
        <ModulesHolder>
          <Module onClick={() => history.push('/cadastros/usuarios')}>
            <FaUser size={20} />
            <span>Usuário</span>
            <span className="arrowRight">
              <FaArrowRight size={20} />
            </span>
          </Module>
        </ModulesHolder>
      </ListHolder>
    </Container>
  );
};

export default Projeto;
