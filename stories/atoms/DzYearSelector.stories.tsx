import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  DzYearSelector,
  DzYearSelectorProps,
} from '../../src/molecules/DzYearSelector/DzYearSelector';

const meta: Meta = {
  title: 'Atoms/Inputs & Selections/DzYearSelector',
  component: DzYearSelector,
};

export default meta;

const Template: Story<DzYearSelectorProps> = args => (
  <DzYearSelector {...args} />
);

export const YearSelector = Template.bind({});
