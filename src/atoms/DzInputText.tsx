import { cn } from '../utils/classnames';
import DzInput from './DzInput';
import { DzText, TEXT_SIZES, TEXT_TYPES } from './DzText';
import React, {
  forwardRef,
  useState,
  useEffect,
  ReactNode,
  ChangeEvent,
} from 'react';
import useDebounce from '../hooks/useDebounce';

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  subtitle?: string;
  extras?: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  onValidation?: (isValid: boolean) => void;
  validator?: Function;
  errorMsg?: string;
  formName?: string;
  extraChildren?: ReactNode;
  customClassContent?: string;
  customInputClass?: string;
  customExtraContentClass?: string;
}

const styles = {
  inputContainer: `
    relative
    flex
    flex-col
    justify-start
    gap-[0.9375rem]
    bg-white-100
  `,
  inputWrap: `
    relative
    appearance-none
    outline-0
    border-b
    p-[0.625rem]
    border-black-40
    bg-transparent
    placeholder:text-black-40
    hover:text-black-100
    hover:border-black-60
    focus-within:border-black-60
    focus:text-black-100
    active:text-black-100
  `,
  input: `
    appearance-none
    bg-transparent
    outline-none
    md:outline-transparent
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
    absolute
    border-red-100
    text-red-100       
    whitespace-nowrap
    w-full
    overflow-x-hidden
  `,
};

export const DzInputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      disabled,
      placeholder,
      title,
      subtitle,
      onValidation,
      extras = '',
      extraChildren = null,
      required = false,
      validator = () => true,
      hasError = false,
      errorMsg = '',
      onChange,
      formName = '',
      className = '',
      customClassContent = '',
      customInputClass = '',
      customExtraContentClass = '',
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState<string>(rest?.value as string);
    const [isValidValue, setIsValidValue] = useState<boolean>(!hasError);
    const [isUntouched, setIsUntouched] = useState(true);
    const [classContent, setClassContent] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 100);
    const disabledClass = disabled ? styles.disabled : '';
    const errorClass = !isUntouched && !isValidValue ? styles.error : '';

    useEffect(() => {
      const isValid = !required && !value ? true : !!validator(value);

      if (isValid !== isValidValue) {
        onValidation?.(isValid);
      }
      if (value) {
        setClassContent(styles.content);
      } else {
        setClassContent('');
      }
      setIsValidValue(isValid);
    }, [
      debouncedValue,
      isValidValue,
      onValidation,
      required,
      value,
      validator,
    ]);

    useEffect(() => {
      setIsValidValue(!hasError);
    }, [hasError]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target) setValue(event.target.value);
      if (!disabled && onChange) {
        onChange(event);
      }
    };

    const handleBlur = () => {
      setIsUntouched(false);
    };

    const errorMessage =
      !isUntouched && errorMsg && !isValidValue ? (
        <DzText
          className={cn(styles.error)}
          style={{ bottom: '-1.4rem' }}
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
      <div className={cn(styles.inputContainer, className)}>
        {titleSection || subTitle ? (
          <div>
            {titleSection}
            {subTitle}
          </div>
        ) : null}

        <div
          className={cn(
            classContent,
            disabledClass,
            styles.inputWrap,
            errorClass,
            customClassContent
          )}
        >
          <DzText
            className="sr-only"
            htmlFor={formName || title}
            textType={TEXT_TYPES.LABEL}
            text={title || 'Input Text'}
          />
          <DzInput
            ref={ref}
            id={formName || title}
            name={formName || title}
            className={cn(styles.input, customInputClass)}
            type="text"
            disabled={disabled}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            {...rest}
          />
          <div
            className={cn(
              styles.extraContentContainer,
              customExtraContentClass
            )}
          >
            {extraInformation}
            {extraChildren}
          </div>
        </div>
        {errorMessage}
      </div>
    );
  }
);

export default DzInputText;
