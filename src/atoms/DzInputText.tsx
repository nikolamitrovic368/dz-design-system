import { cn } from '../utils/classnames';
import DzInput from './DzInput';
import { DzText, TEXT_SIZES, TEXT_TYPES } from './DzText';
import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  subtitle?: string;
  extras?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  validator?: Function;
  errorMsg?: string;
}

const styles = {
  inputContainer: `
    flex
    flex-col
    justify-start
    gap-[0.9375rem]
  `,
  inputWrap: `
    relative
    appearance-none
    outline-0
    pb-2
    border-b
    border-black-40
    bg-transparent
    placeholder:text-black-40
    hover:text-black-100
    hover:border-black-100
    focus:border-black-100
    focus:text-black-100
    active:text-black-100
  `,
  input: `
    appearance-none
    bg-transparent
    outline-0
    w-full
    pr-[3.2rem]
  `,
  content: `
    text-black-100
    border-black-100
  `,
  enabled: `
    border-black-60
    text-black-60
  `,
  disabled: `
    !pointer-events-none
    !text-black-40
    !border-black-40
  `,
  extraContentContainer: `
    pointer-events-none
    absolute
    inset-y-0
    right-0
    flex
    items-center
    pr-3
  `,
  extras: `
    text-black-100
  `,
  error: `
    border-red-100
    text-red-100
  `,
};

export const DzInputText: FC<InputTextProps> = ({
  disabled,
  placeholder,
  title,
  subtitle,
  extras = '',
  required = false,
  validator = () => true,
  hasError = false,
  errorMsg = '',
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState<string>('');
  const [isValidValue, setIsValidValue] = useState<boolean>(!hasError);
  const [classContent, setClassContent] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 100);
  const disabledClass = disabled ? styles.disabled : '';
  const errorClass = !isValidValue ? styles.error : '';

  useEffect(() => {
    setIsValidValue(validator(value));
    if (value) {
      setClassContent(styles.content);
    } else {
      setClassContent('');
    }
  }, [debouncedValue]);

  useEffect(() => {
    setIsValidValue(!hasError);
  }, [hasError]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) setValue(event.target.value);
    if (!disabled && onChange) {
      onChange(event);
    }
  };

  const errorMessage =
    errorMsg && !isValidValue ? (
      <DzText
        className={cn(styles.error)}
        textSize={TEXT_SIZES.XS}
        textType={TEXT_TYPES.SPAN}
        text={errorMsg}
        id={`error-${title}`}
      />
    ) : null;

  const titleSection = title ? (
    <DzText
      textSize={TEXT_SIZES.XS}
      textType={TEXT_TYPES.LABEL}
      text={title}
      htmlFor={title}
      disabled={disabled}
    />
  ) : null;

  const subTitle = subtitle ? (
    <DzText
      className="text-black-60"
      textSize={TEXT_SIZES.XS}
      textType={TEXT_TYPES.P}
      text={subtitle}
      disabled={disabled}
    />
  ) : null;

  const extraInformation =
    extras || required ? (
      <DzText
        className={cn(styles.extras, disabledClass)}
        textSize={TEXT_SIZES.XS}
        textType={TEXT_TYPES.SPAN}
        text={required ? '*' : extras}
        disabled={disabled}
        id={`${title}-${extras}`}
      />
    ) : null;

  return (
    <div className={cn(styles.inputContainer)}>
      <div>
        {titleSection}
        {subTitle}
      </div>
      <div
        className={cn(
          classContent,
          disabledClass,
          styles.inputWrap,
          errorClass
        )}
      >
        <DzInput
          className={cn(styles.input)}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          {...rest}
        />
        <div className={cn(styles.extraContentContainer)}>
          {extraInformation}
        </div>
      </div>
      {errorMessage}
    </div>
  );
};

export default DzInputText;
