import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, Error } from './styles';

interface InputProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  icon?: any;
  iconSize?: number;
  readonly?: boolean;
  clean?: boolean;
}

const InputDate: React.FC<InputProps> = ({
  icon: Icon,
  iconSize,
  name,
  readonly,
  clean,
  ...rest
}) => {
  const datepickerRef = useRef<ReactDatePicker>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!datepickerRef.current?.props.selected);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className="inputHolder"
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      readonly={readonly || false}
      clean={clean}
    >
      {Icon && <Icon size={iconSize} />}
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
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

export default InputDate;
