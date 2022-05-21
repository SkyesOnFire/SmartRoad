import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { ISelectDTO } from 'utils/DTOS';
import { Container, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: any;
  iconSize?: number;
  options: ISelectDTO[];
  disabled?: boolean;
  clean?: boolean;
}

const Select: React.FC<Props> = ({
  icon: Icon,
  iconSize,
  name,
  options,
  readonly,
  clean,
  ...rest
}) => {
  const selectRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleSelectChange = useCallback(() => {
    setIsFilled(true);
  }, []);

  const findDefaultValue = useCallback(() => {
    if (!defaultValue) {
      return;
    }
    const def = options.find(
      option => option.value.toString() === defaultValue.toString()
    );

    return def;
  }, [defaultValue, options]);

  const restt: any = rest;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      clearValue: (ref: any) => {
        ref.select.clearValue();
      },
      getValue: (ref: any) => {
        if (restt.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, restt.isMulti]);

  return (
    <Container
      className={`selectHolder ${readonly && 'disabled'}`}
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      clean={clean}
    >
      {Icon && <Icon size={iconSize} />}
      <ReactSelect
        name={name}
        onChange={handleSelectChange}
        focus={handleSelectFocus}
        ref={selectRef}
        styles={{
          // Fixes the overlapping problem of the component
          menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
        isDisabled={readonly && true}
        menuPosition="fixed"
        defaultValue={findDefaultValue()}
        classNamePrefix="react-select"
        className="react-select"
        options={options}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Nenhuma opção disponível'}
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

export default Select;
