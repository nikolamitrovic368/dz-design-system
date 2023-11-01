import React, { FC, useState, ChangeEventHandler, ChangeEvent } from 'react';
import { cn } from '../utils/classnames';
import { DzText, TEXT_SIZES, TEXT_TYPES } from './DzText';
import { v4 as uuidv4 } from 'uuid';

export interface DzTextBoxProps {
  title: string;
  subtitle?: string;
  disabled?: boolean;
  errorMsg?: string;
  placeholder?: string;
  defaultValue?: string;
  maxWordLength?: number;
  formName?: string;
  hasError?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const styles = {
  default: `
    border-black-40
    text-black-60
    hover:border-black-60
    hover:text-black-100
  `,
  textbox: `
    mt-[0.3125rem]
    p-2.5
    block
    w-full
    shadow-sm
    outline-transparent
    outline-none
    border
    hover:border-black-60
    focus:border-black-60
    scroll-padding-bottom-[2rem]
    pb-[2rem]
  `,
  wordCount: `
    text-xs
    text-black-60
    absolute
    bottom-2
    left-2.5
    w-[95%]
    bg-white-100
  `,
  error: `
    text-red-100
    text-xs
  `,
  disabled: `
    !text-black-40
    !border-black-40
    !placeholder-black-40
    !pointer-events-none
  `,
};

export const DzTextBox: FC<DzTextBoxProps> = ({
  title = '',
  subtitle = '',
  disabled = false,
  errorMsg = '',
  placeholder = '',
  defaultValue = '',
  hasError = false,
  maxWordLength = 150,
  formName = '',
  onChange,
}) => {
  const [formNameId] = useState<string>(formName || `${uuidv4()}-${title}`);
  const [words, setWords] = useState<string>(defaultValue);
  const disabledStyle = disabled ? styles.disabled : '';
  const renderErrorMsg = hasError ? (
    <span className={cn(styles.error)}>{errorMsg}</span>
  ) : null;

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const value = e.target.value;
    if (value.length <= maxWordLength) {
      setWords(value);
    }
    if (!disabled && onChange) {
      onChange(e);
    }
  };
  const countWords = (
    <span className={cn(styles.wordCount, disabledStyle)}>
      {maxWordLength - words.length} characters remaining
    </span>
  );
  const titleSection = title ? (
    <DzText
      textSize={TEXT_SIZES.XS}
      textType={TEXT_TYPES.LABEL}
      text={title}
      htmlFor={subtitle}
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

  return (
    <div>
      {titleSection}
      {subTitle}
      <div className="mt-1 relative">
        <textarea
          onChange={handleChange}
          rows={4}
          name={formName}
          id={formNameId}
          className={cn(
            styles.textbox,
            hasError ? 'border-red-100' : '',
            disabledStyle
          )}
          placeholder={placeholder}
          value={words}
        />
        {countWords}
        {renderErrorMsg}
      </div>
    </div>
  );
};

export default DzTextBox;
