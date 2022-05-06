import React, { useState } from 'react';

import SidebarAdmin from 'components/_layouts/sidebar/admin';
import Header from 'components/_layouts/header/logged';
import { Wrapper, Container } from '../styles';

const AdminLayout: React.FC = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(true);

  return (
    <>
      <Wrapper>
        <SidebarAdmin isOpened={sidebarOpened} />
        <Header
          isSidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <Container isSidebarOpen={sidebarOpened}>{children}</Container>
      </Wrapper>
    </>
  );
};

export default AdminLayout;
