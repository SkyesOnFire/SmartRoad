import React, { useState } from 'react';

import SidebarCadastros from 'components/_layouts/sidebar/cadastros';
import Header from 'components/_layouts/header/logged';
import { Wrapper, Container } from '../styles';

const CadastrosLayout: React.FC = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(true);

  return (
    <>
      <Wrapper>
        <SidebarCadastros isOpened={sidebarOpened} />
        <Header
          isSidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <Container isSidebarOpen={sidebarOpened}>{children}</Container>
      </Wrapper>
    </>
  );
};

export default CadastrosLayout;
