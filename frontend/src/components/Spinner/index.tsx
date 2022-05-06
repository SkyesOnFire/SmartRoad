import React from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { Container, SpinnerIcon } from './styles';

interface IProps extends IconBaseProps {
  text?: boolean;
  noMinHeight?: boolean;
}

const Spinner: React.FC<IProps> = props => {
  const { text, noMinHeight, size, ...rest } = props;

  return (
    <Container noMinHeight={noMinHeight}>
      <SpinnerIcon
        style={{
          marginBottom: text ? '15px' : '',
        }}
        size={size || 50}
        {...rest}
      />
      {text && 'Carregando...'}
    </Container>
  );
};

export default Spinner;
