import React from 'react';
import { useHistory } from 'react-router';

import BoxContainer from 'components/BoxContainer';
import Listagem, { IRow } from 'components/Listagem';

import { Container, TitleHolder, ListHolder } from '../styles';

const Veiculos: React.FC = () => {
  const history = useHistory();

  const rows: IRow[] = [
    {
      label: '#',
      data: 'id',
    },
    {
      label: 'Placa',
      data: 'placa',
    },
    {
      label: 'Renavam',
      data: 'renavam',
    },
    {
      label: 'Cor',
      data: 'cor',
    },
    {
      label: 'Marca',
      data: 'marca',
    },
    {
      label: 'Modelo',
      data: 'modelo',
    },
  ];

  return (
    <Container>
      <TitleHolder>
        Veiculos:
        <button type="button" onClick={() => history.push('/veiculos/novo')}>
          Novo veiculo
        </button>
      </TitleHolder>
      <ListHolder>
        <BoxContainer borderColor="quaternary">
          <Listagem
            rows={rows}
            module="veiculos"
            template="100px 1fr 1fr 1fr 1fr 1fr"
            getUrl="/veiculos/usuario"
            editUrl="/veiculos/veiculo"
            indexUrl="/veiculos/veiculo"
            deleteUrl="/veiculos/veiculo"
          />
        </BoxContainer>
      </ListHolder>
    </Container>
  );
};

export default Veiculos;
