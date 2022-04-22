import React, { useState } from 'react';

import SidebarAuth from 'components/_layouts/sidebar/logged';
import Header from 'components/_layouts/header/logged';
import { Wrapper, Container } from '../styles';

const AuthLayout: React.FC = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(true);

  return (
    <>
      <Wrapper>
        <SidebarAuth isOpened={sidebarOpened} />
        <Header
          isSidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <Container isSidebarOpen={sidebarOpened}>{children}</Container>
      </Wrapper>
    </>
  );
};

export default AuthLayout;
