import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  DzButton,
  DzButtonProps,
  BUTTON_VARIANT_NAMES,
  BUTTON_SIZE_NAMES,
  BUTTON_SIZES,
  ButtonModes,
} from '../../src/atoms/DzButton';

const meta: Meta = {
  title: 'Atoms/Buttons, Radio Buttons & Check Boxes/Button',
  component: DzButton,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: { control: 'select', options: BUTTON_VARIANT_NAMES },
    size: { control: 'select', options: BUTTON_SIZE_NAMES },
    children: { type: 'string', defaultValue: 'Button' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DzButtonProps> = args => <DzButton {...args} />;

export const PrimaryButtonSmall = Template.bind({});
PrimaryButtonSmall.args = { variant: BUTTON_VARIANT_NAMES[0] };

export const PrimaryButtonLarge = Template.bind({});
PrimaryButtonLarge.args = {
  variant: BUTTON_VARIANT_NAMES[0],
  size: BUTTON_SIZES.LARGE,
};

export const PrimaryButtonLargeDisabled = Template.bind({});
PrimaryButtonLargeDisabled.args = {
  variant: BUTTON_VARIANT_NAMES[0],
  size: BUTTON_SIZES.LARGE,
  disabled: true,
};

export const SecondaryButtonLarge = Template.bind({});
SecondaryButtonLarge.args = {
  variant: BUTTON_VARIANT_NAMES[1],
  size: BUTTON_SIZES.LARGE,
};

export const TertiaryButtonLarge = Template.bind({});
TertiaryButtonLarge.args = { variant: BUTTON_VARIANT_NAMES[2] };

export const PrimaryButtonSmallLight = Template.bind({});
PrimaryButtonSmallLight.args = {
  variant: BUTTON_VARIANT_NAMES[0],
  mode: ButtonModes.LIGHT,
};

export const PrimaryButtonLargeLight = Template.bind({});
PrimaryButtonLargeLight.args = {
  variant: BUTTON_VARIANT_NAMES[0],
  size: BUTTON_SIZES.LARGE,
  mode: ButtonModes.LIGHT,
};

export const PrimaryButtonLargeLightDisabled = Template.bind({});
PrimaryButtonLargeLightDisabled.args = {
  variant: BUTTON_VARIANT_NAMES[0],
  size: BUTTON_SIZES.LARGE,
  mode: ButtonModes.LIGHT,
  disabled: true,
};

export const SecondaryButtonLight = Template.bind({});
SecondaryButtonLight.args = {
  variant: BUTTON_VARIANT_NAMES[1],
  size: BUTTON_SIZES.LARGE,
  mode: ButtonModes.LIGHT,
};

export const SecondaryButtonLightDisabled = Template.bind({});
SecondaryButtonLightDisabled.args = {
  variant: BUTTON_VARIANT_NAMES[1],
  size: BUTTON_SIZES.LARGE,
  mode: ButtonModes.LIGHT,
  disabled: true,
};

export const TertiaryButtonLight = Template.bind({});
TertiaryButtonLight.args = {
  variant: BUTTON_VARIANT_NAMES[2],
  mode: ButtonModes.LIGHT,
};

export const TertiaryButtonLightDisabled = Template.bind({});
TertiaryButtonLightDisabled.args = {
  variant: BUTTON_VARIANT_NAMES[2],
  mode: ButtonModes.LIGHT,
  disabled: true,
};
