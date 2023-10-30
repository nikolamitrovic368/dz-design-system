import React, { ReactNode } from 'react';
import { useState } from 'react';
import DzFormModal from './DzFormModal';
import { FORM_MODAL_TYPE_NAMES } from './types/DzFormModalTypes';

type UseDzFormModalProps = {
  formType: typeof FORM_MODAL_TYPE_NAMES[number];
  onSubmit: (formValues: any) => Promise<any>;
  title: string;
  subtitle: string;
  successTitle?: string;
  successSubtitle?: string;
  errorTitle?: string;
  errorSubtitle?: string;
  disableBackdrop?: boolean;
  recaptchaNode?: ReactNode;
  onChange?: (fieldName: string, value: string) => void;
  onDirty?: () => void;
  LinkElement: any;
};
export const useDzFormModal = ({
  formType,
  onSubmit,
  title,
  subtitle,
  successTitle,
  successSubtitle,
  errorTitle,
  errorSubtitle,
  disableBackdrop,
  recaptchaNode,
  onChange,
  onDirty,
  LinkElement = 'a',
}: UseDzFormModalProps) => {
  const [isOpen, setIsOpen] = useState(disableBackdrop || false);
  const openClickHandler = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const FormModal = (
    <DzFormModal
      title={title}
      subtitle={subtitle}
      successTitle={successTitle}
      successSubtitle={successSubtitle}
      errorTitle={errorTitle}
      errorSubtitle={errorSubtitle}
      isOpen={isOpen}
      onClose={onClose}
      type={formType}
      onSubmit={onSubmit}
      disableBackdrop={disableBackdrop}
      recaptchaNode={recaptchaNode}
      onChange={onChange}
      onDirty={onDirty}
      LinkElement={LinkElement}
    />
  );

  return {
    FormModal,
    openClickHandler,
  };
};
