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
  mask: string;
  readonly?: boolean;
}

const PhoneMaskedInput: React.FC<InputProps> = ({
  icon: Icon,
  iconSize,
  name,
  mask,
  readonly,
  ...rest
}) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [value, setValue] = useState('');

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const ajusta = (v: string) => {
    const digitos = !v ? '' : v.replace(/[^\d]/g, '');
    if (!digitos || digitos.length < 10) return v;
    const corte = digitos.length === 10 ? 6 : 7;
    const max = digitos.length > 11 ? 11 : digitos.length;
    return `(${digitos.substring(0, 2)}) ${digitos.substring(
      2,
      corte
    )}-${digitos.substring(corte, max)}`;
  };

  const maskBuilder = (v: string) => {
    if (!v || v.length === 0) return '';
    const a = ajusta(v);
    return a.length >= 6 && a[5] === '9' ? '(99) 99999-9999' : '(99) 9999-9999';
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, val: string) {
        ref.setInputValue(val);
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
        mask={maskBuilder(value)}
        onChange={e => setValue(e.target.value)}
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

export default PhoneMaskedInput;
