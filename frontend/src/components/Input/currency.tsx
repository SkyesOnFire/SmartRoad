import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import CurrencyInput from 'react-currency-input-field';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  step?: number;
  readonly?: boolean;
}

const InputCurrency: React.FC<InputProps> = ({
  name,
  step,
  style,
  readonly,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className="inputHolder"
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      readonly={readonly || false}
      style={style}
    >
      <CurrencyInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        step={step}
        allowNegativeValue={false}
        prefix="R$ "
        readOnly={readonly && true}
        disableGroupSeparators
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="var(--error-color)" />
        </Error>
      )}
    </Container>
  );
};

export default InputCurrency;
