import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  TextareaHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconSize?: number;
  readonly?: boolean;
  clean?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  icon: Icon,
  iconSize,
  name,
  readonly,
  clean,
  ...rest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
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
      className="textareaHolder"
      isFilled={isFilled}
      isFocused={isFocused}
      isErrored={!!error}
      readonly={readonly || false}
      clean={clean}
    >
      {Icon && <Icon size={iconSize} />}
      <textarea
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

export default Textarea;
