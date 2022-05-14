import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactInputMask, { Props } from 'react-input-mask';

import { Container, Error } from './styles';

interface InputProps extends Props {
  name: string;
  icon?: any;
  iconSize?: number;
  readonly?: boolean;
}

const MaskedInput: React.FC<InputProps> = ({
  icon: Icon,
  iconSize,
  name,
  readonly,
  ...rest
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className="inputHolder"
      isFocused={isFocused}
      isErrored={!!error}
      readonly={readonly || false}
    >
      {Icon && <Icon size={iconSize} />}
      <ReactInputMask
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        ref={inputRef}
        readOnly={readonly && true}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="var(--error-color)" size={iconSize} />
        </Error>
      )}
    </Container>
  );
};

export default MaskedInput;
