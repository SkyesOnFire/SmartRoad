import React from 'react';
import { Container } from './styles';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[] | JSX.Element;
  extraClass?: string;
  borderColor?: 'primary' | 'secundary' | 'tertiary' | 'quaternary';
  titulo?: string;
  subtitulo?: string;
}

const BoxContainer: React.FC<IProps> = props => {
  // eslint-disable-next-line prettier/prettier
  const {
    extraClass,
    borderColor,
    titulo,
    subtitulo,
    children,
    ...rest
    // eslint-disable-next-line prettier/prettier
  } = props;

  return (
    <Container
      className={extraClass ? `container ${extraClass}` : 'container'}
      borderColor={borderColor}
      {...rest}
    >
      {titulo && <strong className="title">{titulo}</strong>}
      {subtitulo && <strong className="title sub">{subtitulo}</strong>}
      <div className="conteudo">{children}</div>
    </Container>
  );
};

export default BoxContainer;
