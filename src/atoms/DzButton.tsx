import composeRefs from '@seznam/compose-react-refs';
import { cn } from '../utils/classnames';
import React, {
  useRef,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ButtonHTMLAttributes,
  useEffect,
} from 'react';

import useHover from '../hooks/useHover';
import CheckmarkIcon from '../svgIcons/checkmark';
import ChevronLeft from '../svgIcons/chevronLeft';
import ChevronRight from '../svgIcons/chevronRight';

export const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
};
export const BUTTON_SIZES = {
  SMALL: 'small',
  LARGE: 'large',
};
export const BUTTON_VARIANT_NAMES = [
  BUTTON_VARIANTS.PRIMARY,
  BUTTON_VARIANTS.SECONDARY,
  BUTTON_VARIANTS.TERTIARY,
] as const;

export const BUTTON_SIZE_NAMES = [
  BUTTON_SIZES.SMALL,
  BUTTON_SIZES.LARGE,
] as const;

export type ButtonVariant = typeof BUTTON_VARIANT_NAMES[number];
export type ButtonSize = typeof BUTTON_SIZE_NAMES[number];

export enum ButtonModes {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface DzButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  focus?: boolean;
  hover?: boolean;
  active?: boolean;
  disabled?: boolean;
  success?: boolean;
  showRightArrow?: boolean;
  showLeftArrow?: boolean;
  maxWidth?: string;
  minWidth?: string;
  className?: string;
  mode?: ButtonModes;
}

const styles: any = {
  btn: `
    disabled:pointer-events-none
    outline-transparent
  `,
  iconDiv: `
    flex
    justify-center
    items-center
  `,
  iconContainer: `
    flex
    gap-2
    items-center
  `,
  primary_dark: `
    active:border-black-100
    active:text-black-100  
    bg-transparent
    border
    border-black-40
    disabled:border-black-40
    disabled:text-black-40
    focus:border-black-100
    focus:text-black-100    
    hover:border-black-100
    hover:text-black-100  
    text-black-80
  `,
  secondary_dark: `
    active:bg-black-100
    active:text-white-100
    bg-black-60
    disabled:bg-black-40
    disabled:text-white-100
    focus:bg-black-100
    focus:text-white-100
    hover:bg-black-100
    hover:text-white-100
    text-white-100
  `,
  tertiary_dark: `
    active:bg-black-20
    active:text-black-80
    bg-transparent
    disabled:text-black-40    
    focus:bg-black-20
    focus:text-black-80
    hover:bg-black-20
    hover:text-black-80
    text-black-60
  `,
  primary_light: `
    active:border-white-100
    active:text-white-100
    bg-transparent
    border
    border-white-100
    border-opacity-40
    disabled:border-white-100
    disabled:text-white-100
    disabled:text-opacity-40
    focus:border-white-100
    hover:border-white-100
    hover:text-white-100
    text-white-100
  `,
  secondary_light: `
    bg-white-100
    bg-opacity-60
    text-black-80
    active:bg-white-100
    active:text-black-100
    hover:bg-white-100
    hover:text-black-100
    focus:bg-white-100
    focus:text-black-100
    disabled:bg-black-100
    disabled:bg-opacity-20
    disabled:text-black-80    
  `,
  tertiary_light: `
    bg-transparent
    text-white-100
    active:bg-white-100
    active:bg-opacity-20
    active:text-white-100
    hover:bg-white-100
    hover:bg-opacity-20
    hover:text-white-100
    focus:bg-white-100
    focus:bg-opacity-20
    focus:text-white-100
    disabled:text-white-100
    disabled:text-opacity-40
  `,
  large: `
    py-[0.8125rem]
    px-[1.5625rem]
    text-md
  `,
  small: `
    py-[0.3125rem]
    px-[1.5625rem]
    text-xs
  `,
  childrenContainer: `
    px-[1.6875rem]
  `,
};

const iconColor = (
  variant: ButtonVariant,
  isHover: boolean,
  disabled: boolean
): string => {
  if (disabled && variant !== BUTTON_VARIANTS.SECONDARY) return '#CDCDCD';
  switch (variant) {
    case BUTTON_VARIANTS.PRIMARY:
      return isHover ? 'white' : 'black';
    case BUTTON_VARIANTS.SECONDARY:
      return 'white';
    case BUTTON_VARIANTS.TERTIARY:
      return 'black';

    default:
      return 'black';
  }
};

export const DzButton: ForwardRefExoticComponent<DzButtonProps> = forwardRef(
  (
    {
      children,
      variant = BUTTON_VARIANTS.PRIMARY,
      size = BUTTON_SIZES.SMALL,
      disabled = false,
      success,
      onClick,
      maxWidth,
      minWidth,
      showRightArrow,
      showLeftArrow,
      className = '',
      mode = ButtonModes.DARK,
      ...rest
    },
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    const hoverRef = useRef<HTMLButtonElement | null>(null);
    const isHover = useHover(hoverRef);
    const fillIcon = iconColor(variant, isHover, disabled);
    useEffect(() => {
      if (hoverRef.current) {
        hoverRef.current.blur();
      }
    }, [isHover]);

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();

      if (!disabled && onClick) {
        onClick(event);
      }
    };

    const childrenWithIcons =
      success || showLeftArrow || showRightArrow ? (
        <span className={cn(styles.iconContainer)}>
          <div className={cn(styles.iconDiv)}>
            {success ? (
              <CheckmarkIcon aria-hidden="true" fill={fillIcon} />
            ) : null}
            {showLeftArrow ? (
              <ChevronLeft aria-hidden="true" fill={fillIcon} />
            ) : null}
          </div>
          <div className={cn(styles.childrenContainer)}>{children}</div>
          <div className={cn(styles.iconDiv)}>
            {showRightArrow ? (
              <ChevronRight aria-hidden="true" fill={fillIcon} />
            ) : null}
          </div>
        </span>
      ) : (
        children
      );

    return (
      <button
        type="button"
        ref={composeRefs(hoverRef, forwardedRef) as any}
        className={cn(
          styles.btn,
          styles[`${variant}_${mode}`],
          styles[size],
          className
        )}
        style={{ maxWidth: maxWidth, minWidth: minWidth }}
        onClick={handleClick}
        disabled={disabled}
        {...rest}
      >
        {childrenWithIcons}
      </button>
    );
  }
);

DzButton.displayName = 'DzButton';
DzButton.defaultProps = {
  variant: BUTTON_VARIANTS.PRIMARY,
  size: BUTTON_SIZES.SMALL,
  maxWidth: '100%',
  disabled: false,
  success: false,
  minWidth: 'fit-content',
};

export default DzButton;
