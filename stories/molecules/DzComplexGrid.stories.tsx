import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  DzComplexGrid,
  DzComplexGridProps,
} from '../../src/molecules/DzComplexGrid/DzComplexGrid';
import { cards } from '../../constants/mocks/DzComplexGrid';

const meta: Meta = {
  title: 'Molecules/Content/DzComplexGrid',
  component: DzComplexGrid,
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dzFigmaWhite',
    },
  },
};

export default meta;

const Template: Story<DzComplexGridProps> = args => <DzComplexGrid {...args} />;

export const ComplexGridWithRange = Template.bind({});
ComplexGridWithRange.args = { cards, displayNumberOfResults: true };

export const ComplexGridWithLink = Template.bind({});
ComplexGridWithLink.args = {
  cards,
  displayNumberOfResults: false,
  headingTitle: 'Browse Prints from Utopia Editions',
  useLink: true,
  linkCTA: {
    text: 'View all',
    url: '/',
  },
  steps: [
    {
      id: 1,
      numberOfColumns: 4,
      icon: null,
    },
  ],
};
