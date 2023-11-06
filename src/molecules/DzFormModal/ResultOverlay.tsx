import { DzTitle, TITLE_SIZES, TITLE_TYPES } from '../../atoms/DzTitle';
import { DzText, TEXT_SIZES, TEXT_TYPES } from '../../atoms/DzText';
import { BUTTON_SIZES, BUTTON_VARIANTS, DzButton } from '../../atoms/DzButton';
import React from 'react';
import { cn } from '../../utils/classnames';

interface ResultOverlayProps {
  successTitle?: string;
  successSubtitle?: string;
  errorTitle?: string;
  errorSubtitle?: string;
  isSuccess: boolean;
  onClickClose: () => void;
  onClickRetry: () => void;
  hideCloseButton?: boolean;
}

const YOUR_MESSAGE_HAS_BEEN_RECEIVED =
  'Your message has been received and a member of our team will be in touch shortly.';
const THANK_YOU_FOR_YOUR_INQUIRY = 'Thank you for your inquiry.';
const FAILED_TO_SEND_YOUR_INQUIRY = 'Failed to send your inquiry.';
const WE_ARE_SORRY = 'We are sorry, but something went wrong.';

const styles = {
  container: `
    bg-white-100     
  `,
  buttonsContainer: `
    absolute 
    flex
    bottom-0 
    right-0 
    w-full       
  `,
  button: `
    flex-auto
  `,
};

export const ResultOverlay = ({
  isSuccess,
  onClickClose,
  onClickRetry,
  hideCloseButton,
  successTitle,
  successSubtitle,
  errorTitle,
  errorSubtitle,
}: ResultOverlayProps) => {
  const title = isSuccess
    ? successTitle || THANK_YOU_FOR_YOUR_INQUIRY
    : errorTitle || FAILED_TO_SEND_YOUR_INQUIRY;
  const subtitle = isSuccess
    ? successSubtitle || YOUR_MESSAGE_HAS_BEEN_RECEIVED
    : errorSubtitle || WE_ARE_SORRY;

  return (
    <div className={styles.container}>
      <DzTitle
        title={title}
        classNameTitle={!isSuccess && 'text-red-100'}
        titleType={TITLE_TYPES.H1}
        titleSize={TITLE_SIZES.XL}
      />
      <DzText
        text={subtitle}
        textType={TEXT_TYPES.P}
        textSize={TEXT_SIZES.SMALL}
        className={cn('mt-[0.625rem]', !isSuccess ? 'text-red-100' : '')}
      />
      <div
        className={cn(
          styles.buttonsContainer,
          hideCloseButton ? '' : 'md:w-6/12'
        )}
      >
        {!isSuccess && !hideCloseButton && (
          <>
            <DzButton
              className={styles.button}
              variant={BUTTON_VARIANTS.TERTIARY}
              size={BUTTON_SIZES.LARGE}
              onClick={onClickClose}
            >
              Close
            </DzButton>
            <DzButton
              className={styles.button}
              size={BUTTON_SIZES.LARGE}
              onClick={onClickRetry}
            >
              Retry
            </DzButton>
          </>
        )}

        {isSuccess && !hideCloseButton && (
          <DzButton
            className={styles.button}
            size={BUTTON_SIZES.LARGE}
            onClick={onClickClose}
          >
            Close
          </DzButton>
        )}
      </div>
    </div>
  );
};

export default ResultOverlay;
