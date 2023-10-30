import React, { Fragment } from 'react';
import {
  DzText,
  DzTextBox,
  DzButton,
  DzInputText,
  DzSelect,
  DzFileUploader,
  DzCheckbox,
  BUTTON_SIZES,
  TEXT_SIZES,
} from '../../atoms';
import { DzGridColumns, DzColumn } from '../../layout';
import { cn } from '../../utils/classnames';
import { FORM_FIELD_TYPES } from './DzForm';

export type DzFormBuilderProps = {
  form: any;
  formAction: Function;
  isSubmitDisabled?: boolean;
  submitAction: Function;
  onFieldValidation: Function;
  onChangeInput: Function;
  formValues: Record<string, any>;
  titleTextClassName?: string;
  subtitleTextClassName?: string;
  onFocusInput?: Function;
  formStepErrorMessage?: string;
};

const styles: any = {
  formLayout: `
    flex
    flex-col
    gap-5
    md:gap-10
  `,
  titleText: `
    text-lg
    md:text-xl
  `,
  headInformation: `
    flex
    flex-col
    gap-[0.625rem]
  `,
  sectionTitle: `
    my-5
  `,
  secondarySubtitle: `
    text-black-60
  `,
  ctaButton: `
    md:ml-auto
    w-full        
  `,
  ctaContainer: `
    flex
  `,
  formStepErrorMessage: `
    absolute
    mt-[1rem]
    text-red-100
  `,
};

const atomsPerType = {
  input: data => {
    return <DzInputText {...data} />;
  },
  select: data => {
    return <DzSelect {...data} />;
  },
  uploader: data => {
    return <DzFileUploader {...data} />;
  },
  text: text => {
    return <DzText text={text} />;
  },
  textbox: data => {
    return <DzTextBox {...data} />;
  },
  checkbox: data => {
    return <DzCheckbox {...data} />;
  },
};

export const DzFormBuilder = ({
  form,
  formAction,
  isSubmitDisabled,
  onFieldValidation,
  onChangeInput,
  formValues,
  titleTextClassName,
  subtitleTextClassName,
  onFocusInput,
  formStepErrorMessage,
}: DzFormBuilderProps) => {
  const {
    formName,
    title,
    primarySubtitle,
    secondarySubtitle,
    formSections,
    CTAProps,
  } = form ?? {};
  const { text: CTAText, onClick } = CTAProps ?? {};

  return (
    <div className={cn(styles.formLayout)}>
      <div className={cn(styles.headInformation)}>
        {title ? (
          <DzText
            className={cn(titleTextClassName || styles.titleText)}
            textSize={TEXT_SIZES.LARGE}
            text={title}
          />
        ) : null}
        {primarySubtitle || secondarySubtitle ? (
          <div>
            {primarySubtitle ? (
              <DzText
                text={primarySubtitle}
                className={subtitleTextClassName || styles.secondarySubtitle}
              />
            ) : null}
            {secondarySubtitle ? (
              <DzText
                className={cn(
                  subtitleTextClassName || styles.secondarySubtitle
                )}
                text={secondarySubtitle}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      <div>
        {formSections.map(section => {
          const { id, sectionTitle, fields = [] } = section ?? {};
          return (
            <Fragment key={id}>
              {sectionTitle ? (
                <DzText
                  className={cn(styles.sectionTitle)}
                  text={sectionTitle}
                />
              ) : null}
              {fields?.length ? (
                <DzGridColumns key={id}>
                  {fields?.map((field, key) => {
                    const {
                      name,
                      placeholder,
                      title,
                      required,
                      type,
                      data = {},
                      span,
                      className,
                    } = field ?? {};
                    const requiredTag = required ? '*' : '';
                    const value = formValues[name];
                    const componentProps = {
                      ...(title ? { title: `${title}${requiredTag}` } : {}),
                      ...(required ? { required } : {}),
                      placeholder,
                      ...data,
                      onChange: event =>
                        type === FORM_FIELD_TYPES.CHECKBOX
                          ? onChangeInput?.(name, event.target.checked)
                          : onChangeInput?.(name, event.target.value),
                      onValidation: isValid => onFieldValidation(key, isValid),
                      onFocus: () => onFocusInput?.(name),
                    };
                    if (type === FORM_FIELD_TYPES.TEXTBOX) {
                      componentProps.maxWordLength = field.maxWordLength;
                    }
                    if (type === FORM_FIELD_TYPES.CHECKBOX) {
                      componentProps.checked = value || '';
                      componentProps.titleClassName = 'text-xs';
                      delete componentProps.onValidation;
                      delete componentProps.errorMsg;
                      delete componentProps.validator;
                    } else {
                      componentProps.value = value || '';
                    }
                    const Component = atomsPerType?.[type]?.(componentProps);
                    return Component ? (
                      <DzColumn
                        key={`${sectionTitle}-${title}-${key}`}
                        className={cn('mt-auto', className)}
                        span={span ?? 12}
                      >
                        {Component}
                      </DzColumn>
                    ) : null;
                  })}
                </DzGridColumns>
              ) : null}
            </Fragment>
          );
        })}
        {formStepErrorMessage && (
          <DzText
            text={formStepErrorMessage}
            className={styles.formStepErrorMessage}
          />
        )}
      </div>
      <DzGridColumns
        className={cn(
          'mb-0 md:mb-[1.25rem] mt-[1rem]',
          CTAProps.description ? '' : 'gap-y-0'
        )}
      >
        <DzColumn span={[12, 6]} className="md:row-start-1 row-start-2">
          {CTAProps.description && (
            <DzText text={CTAProps.description} className="flex-1" />
          )}
        </DzColumn>
        <DzColumn span={[12, CTAProps.description ? 6 : 12]}>
          <DzButton
            {...CTAProps}
            className={cn(styles.ctaButton)}
            disabled={isSubmitDisabled}
            size={BUTTON_SIZES.LARGE}
            onClick={onClick ?? formAction}
            form={formName}
          >
            {CTAText}
          </DzButton>
        </DzColumn>
      </DzGridColumns>
    </div>
  );
};

export default DzFormBuilder;
