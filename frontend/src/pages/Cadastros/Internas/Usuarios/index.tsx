import React from 'react';
import { useHistory } from 'react-router';

import BoxContainer from 'components/BoxContainer';
import Listagem, { IRow } from 'components/Listagem';

import { Container, TitleHolder, ListHolder } from '../styles';

const Usuarios: React.FC = () => {
  const history = useHistory();

  const rows: IRow[] = [
    {
      label: '#',
      data: 'id',
    },
    {
      label: 'Nome',
      data: 'nome',
    },
    {
      label: 'E-mail',
      data: 'email',
    },
    {
      label: 'CPF',
      data: 'cpf',
    },
    {
      label: 'Perfil',
      data: 'des_perfil',
    },
  ];

  return (
    <Container>
      <TitleHolder>
        Usuários:
        <button
          type="button"
          onClick={() => history.push('/cadastros/usuarios/novo')}
        >
          Novo usuário
        </button>
      </TitleHolder>
      <ListHolder>
        <BoxContainer borderColor="quaternary">
          <Listagem
            rows={rows}
            module="usuarios"
            template="100px 2fr 2.5fr 1.5fr 1.1fr"
            editUrl="/cadastros/usuarios/usuario"
            indexUrl="/cadastros/usuarios/usuario"
            deleteUrl="/usuarios/usuario"
          />
        </BoxContainer>
      </ListHolder>
    </Container>
  );
};

export default Usuarios;
