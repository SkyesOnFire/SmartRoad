import React from 'react';
import { useHistory } from 'react-router';

import BoxContainer from 'components/BoxContainer';
import Listagem, { IRow } from 'components/Listagem';

import { Container, TitleHolder, ListHolder } from '../styles';

const Tags: React.FC = () => {
  const history = useHistory();

  const rows: IRow[] = [
    {
      label: '#',
      data: 'id',
    },
    {
      label: 'Código da tag',
      data: 'cod_tag',
    },
  ];

  return (
    <Container>
      <TitleHolder>
        Tags:
        <button type="button" onClick={() => history.push('/tags/novo')}>
          Nova tag
        </button>
      </TitleHolder>
      <ListHolder>
        <BoxContainer borderColor="quaternary">
          <Listagem
            rows={rows}
            module="tags"
            template="100px 1fr"
            getUrl="/tags/usuario"
            editUrl="/tags/tag"
            indexUrl="/tags/tag"
            deleteUrl="/tags/tag"
          />
        </BoxContainer>
      </ListHolder>
    </Container>
  );
};

export default Tags;
