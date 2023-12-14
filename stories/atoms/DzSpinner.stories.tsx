import React from 'react';
import { Meta } from '@storybook/react';
import { DzSpinner } from '../../src/atoms/DzSpinner';

const meta: Meta = {
  title: 'Atoms/Helpers/DzSpinner',
  component: DzSpinner,
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dzFigmaWhite',
    },
  },
};

export default meta;

const Template = () => <DzSpinner />;

export const PrimaryDzSpinner = Template.bind({});
