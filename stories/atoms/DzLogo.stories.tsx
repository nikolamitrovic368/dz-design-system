import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DzLogo, DzLogoProps } from '../../src/atoms/DzLogo';

const meta: Meta = {
  title: 'Atoms/Icons/DzLogo',
  component: DzLogo,
  argTypes: {
    className: { control: { type: null } },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DzLogoProps> = args => <DzLogo {...args} />;

export const DavidZwirnerLogo = Template.bind({});
