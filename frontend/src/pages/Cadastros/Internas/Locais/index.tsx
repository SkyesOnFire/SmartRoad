import React from 'react';
import { useHistory } from 'react-router';

import BoxContainer from 'components/BoxContainer';
import Listagem, { IRow } from 'components/Listagem';

import { Container, TitleHolder, ListHolder } from '../styles';

const Locais: React.FC = () => {
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
      label: 'Endereço',
      data: 'endereco_completo',
    },
    {
      label: 'Cidade',
      data: 'cidade',
    },
    {
      label: 'Estado',
      data: 'estado',
    },
    {
      label: 'Latitude',
      data: 'latitude',
    },
    {
      label: 'Longitude',
      data: 'longitude',
    },
  ];

  return (
    <Container>
      <TitleHolder>
        Locais:
        <button type="button" onClick={() => history.push('/locais/novo')}>
          Novo local
        </button>
      </TitleHolder>
      <ListHolder>
        <BoxContainer borderColor="quaternary">
          <Listagem
            rows={rows}
            module="locais"
            template="100px 1fr 1fr 0.6fr 0.6fr 0.5fr 0.5fr"
            getUrl="/locais/usuario"
            editUrl="/locais/local"
            indexUrl="/locais/local"
            deleteUrl="/locais/local"
          />
        </BoxContainer>
      </ListHolder>
    </Container>
  );
};

export default Locais;
