import React, { ReactNode, useEffect, useState } from 'react';
import DzForm from '../DzForm/DzForm';
import { DzMedia, DzModalContainer, MEDIA_TYPES } from '../../atoms';
import { termsAndConditions } from './termsAndConditions';
import useLockedBodyScroll from '../../hooks/useLockedBodyScroll';
import ResultOverlay from './ResultOverlay';
import {
  FORM_MODAL_TYPE_NAMES,
  FORM_MODAL_TYPES,
} from './types/DzFormModalTypes';
import { inquireFormSteps } from './formSteps/inquireFormSteps';
import { newsletterFormSteps } from './formSteps/newsletterFormSteps';

export type DzFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  successTitle?: string;
  successSubtitle?: string;
  errorTitle?: string;
  errorSubtitle?: string;
  onSubmit: (formValues: Record<string, any>) => Promise<any>;
  type: typeof FORM_MODAL_TYPE_NAMES[number];
  recaptchaNode?: ReactNode;
  disableBackdrop?: boolean;
  onFocus?: Function;
  onChange?: (fieldName: string, value: any) => void;
  onDirty?: () => void;
  LinkElement: any;
  ImgElement: any;
  image?: {
    src: string;
    alt: string;
  };
};

export type SubmissionResult = {
  isSuccess: boolean;
  error?: string;
};

const FORM_TYPES_TO_STEPS = {
  [FORM_MODAL_TYPES.INQUIRE]: inquireFormSteps,
  [FORM_MODAL_TYPES.NEWSLETTER]: newsletterFormSteps,
};

export const DzFormModal = ({
  isOpen,
  onClose,
  subtitle,
  title,
  successTitle,
  successSubtitle,
  errorTitle,
  errorSubtitle,
  onSubmit,
  recaptchaNode,
  type,
  disableBackdrop = false,
  onFocus,
  onChange,
  onDirty,
  LinkElement = 'a',
  ImgElement,
  image,
}: DzFormModalProps) => {
  const formSteps = FORM_TYPES_TO_STEPS[type];
  const [submittedFormValues, setSubmittedFormValues] = useState<
    Record<string, any>
  >();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<
    boolean | undefined
  >();
  const [, setIsBodyScrollLocked] = useLockedBodyScroll(false, 'root');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmitForm = (formValues: Record<string, any>) => {
    setSubmittedFormValues(formValues);
    doSubmit(formValues);
  };
  const onCloseModal = () => {
    setIsBodyScrollLocked(false);
    onClose();
    setIsSubmitting(false);
  };
  const onClickRetry = () => {
    if (submittedFormValues) {
      doSubmit(submittedFormValues);
    }
  };
  const doSubmit = (formValues: Record<string, any>) => {
    setIsSubmitting(true);
    setIsSubmitSuccessful(undefined);
    onSubmit(formValues)
      .then((result: SubmissionResult) => {
        if (result.isSuccess) {
          setIsSubmitSuccessful(true);
        } else {
          setIsSubmitSuccessful(false);
        }
      })
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => setIsBodyScrollLocked(isOpen), [
    isOpen,
    setIsBodyScrollLocked,
  ]);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitSuccessful(undefined);
      setSubmittedFormValues(undefined);
    }
  }, [isOpen]);

  // TODO set title/subtitle/description for all steps
  formSteps[0].title = title;
  formSteps[0].primarySubtitle = subtitle;
  formSteps[0].CTAProps.description = termsAndConditions;

  return (
    <DzModalContainer
      isOpen={isOpen}
      onClose={onCloseModal}
      disableBackdrop={disableBackdrop}
      className={
        isSubmitSuccessful === false && !disableBackdrop
          ? 'border-[1px] border-red-100 border-opacity-25'
          : ''
      }
    >
      {!image ? (
        <DzForm
          LinkElement={LinkElement}
          steps={formSteps}
          onSubmit={onSubmitForm}
          onFocus={onFocus}
          onChange={onChange}
          onDirty={onDirty}
          showStepsCount={false}
          recaptchaNode={recaptchaNode}
          containerClassName="bg-white-100 max-w-[926px] p-5"
          titleTextClassName="text-xl md:text-xxl"
          subtitleTextClassName="text-sm md:text-md"
          isSubmitDisabled={isSubmitting}
          overlayContent={
            isSubmitSuccessful !== undefined ? (
              <ResultOverlay
                isSuccess={isSubmitSuccessful}
                successTitle={successTitle}
                successSubtitle={successSubtitle}
                errorTitle={errorTitle}
                errorSubtitle={errorSubtitle}
                onClickClose={onCloseModal}
                onClickRetry={onClickRetry}
                hideCloseButton={disableBackdrop}
              />
            ) : null
          }
        />
      ) : (
        <div className="flex flex-col md:flex-row max-w-[926px]">
          <DzMedia
            type={MEDIA_TYPES.IMAGE}
            ImgElement={ImgElement}
            LinkElement={LinkElement}
            imgClass="h-full"
            imageContainerClassName="md:w-1/3 h-[180px] md:h-auto"
            imgProps={{
              src: image.src,
              alt: image.alt,
              fill: true,
              sizes: '(max-width: 768px) 728px, 308px',
            }}
          />
          <DzForm
            LinkElement={LinkElement}
            steps={formSteps}
            onSubmit={onSubmitForm}
            onFocus={onFocus}
            onChange={onChange}
            onDirty={onDirty}
            showStepsCount={false}
            recaptchaNode={recaptchaNode}
            containerClassName="bg-white-100 md:w-2/3 p-5"
            titleTextClassName="text-xl md:text-xxl"
            subtitleTextClassName="text-sm md:text-md"
            isSubmitDisabled={isSubmitting}
            overlayContent={
              isSubmitSuccessful !== undefined ? (
                <ResultOverlay
                  isSuccess={isSubmitSuccessful}
                  successTitle={successTitle}
                  successSubtitle={successSubtitle}
                  errorTitle={errorTitle}
                  errorSubtitle={errorSubtitle}
                  onClickClose={onCloseModal}
                  onClickRetry={onClickRetry}
                  hideCloseButton={disableBackdrop}
                />
              ) : null
            }
          />
        </div>
      )}
    </DzModalContainer>
  );
};

export default DzFormModal;
