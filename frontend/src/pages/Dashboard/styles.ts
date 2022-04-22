import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2 {
    text-align: center;
    color: var(--text-color-2);
  }

  h2 {
    font-size: 36px;
    text-align: center;
    color: var(--secundary-color);
  }
  iframe {
    width: 100%;
    height: 100%;
  }
`;

export const LogoHolder = styled.div`
  width: 100%;
  height: 50px;

  margin-bottom: 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    width: auto;
  }
`;
