/* eslint-disable no-param-reassign */
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  row?: boolean;
  options: {
    name: string;
    value: string;
    label: string;
    marked?: boolean;
  }[];
}

const Checkbox: React.FC<InputProps> = ({ name, options, row, ...rest }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <Container row={row} className="checkboxHolder">
      {options.map((option, index) => {
        return (
          <label htmlFor={option.name} key={option.name}>
            <input
              defaultChecked={option.marked || false}
              ref={ref => {
                inputRefs.current[index] = ref as HTMLInputElement;
              }}
              value={option.value}
              type="checkbox"
              id={option.name}
              name={option.name}
              {...rest}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </Container>
  );
};

export default Checkbox;
