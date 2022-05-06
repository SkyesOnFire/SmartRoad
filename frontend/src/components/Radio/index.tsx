/* eslint-disable no-return-assign */
import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  options: Option[];
  row: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Radio: React.FC<InputProps> = ({ name, options, row, onClick }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue(refs: HTMLInputElement[]) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs: HTMLInputElement[], value) {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container className="radioHolder">
      {options.map((option, index) => (
        <label className="radio" key={option.value}>
          <input
            onClick={onClick}
            ref={elRef => (elRef ? (inputRefs.current[index] = elRef) : null)}
            type="radio"
            name={fieldName}
            value={option.value}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </Container>
  );
};

export default Radio;
