import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  readonly?: boolean;
}

const FileInput: React.FC<InputProps> = ({
  icon: Icon,
  iconSize,
  name,
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
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        ref.value = '';
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
    >
      {Icon && <Icon size={iconSize} />}
      <input
        type="file"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        readOnly={readonly && true}
        ref={inputRef}
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

export default FileInput;
