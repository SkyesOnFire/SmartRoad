import styled, { css } from 'styled-components';

interface BoxContainerProps {
  borderColor?: 'primary' | 'secundary' | 'tertiary' | 'quaternary';
}

export const Container = styled.div<BoxContainerProps>`
  width: 100%;
  height: auto;

  flex: 1 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 15px;
  margin: 0 0 30px 0;

  border-radius: 15px;

  border-top: 1px solid var(--main-color);

  background: var(--box-bg-color);

  box-shadow: 0 0 20px var(--primary-shadow);

  strong.title {
    width: 100%;

    color: var(--main-color);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 5px;
  }

  strong.title.sub {
    margin-top: 5px;
    font-size: 1rem;
    font-weight: 400;
  }

  strong.title:last-of-type {
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(207 207 207 / 50%);
  }

  div.conteudo {
    width: 100%;
    height: auto;
    flex: 1 1;
  }

  ${props =>
    props.borderColor === 'primary' &&
    css`
      border-color: var(--primary-color);
      box-shadow: 0 0 20px var(--primary-shadow);
      strong.title {
        color: var(--primary-color);
      }
    `}

  ${props =>
    props.borderColor === 'secundary' &&
    css`
      border-color: var(--secundary-color);
      box-shadow: 0 0 20px var(--secundary-shadow);
      strong.title {
        color: var(--secundary-color);
      }
    `}

  ${props =>
    props.borderColor === 'tertiary' &&
    css`
      border-color: var(--tertiary-color);
      box-shadow: 0 0 20px var(--tertiary-shadow);
      strong.title {
        color: var(--tertiary-color);
      }
    `}

  ${props =>
    props.borderColor === 'quaternary' &&
    css`
      border-color: var(--quaternary-color);
      box-shadow: 0 0 20px var(--quaternary-shadow);
      strong.title {
        color: var(--quaternary-color);
      }
    `}

  overflow-x: scroll !important;

  @media (max-width: 768px) {
    width: auto;
  }
`;
