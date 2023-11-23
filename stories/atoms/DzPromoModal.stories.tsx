import React, { ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { DzPromoModal } from '../../src/molecules/DzPromoModal/DzPromoModal';

const meta: Meta = {
  title: 'Atoms/Modals/DzPromoModal',
  component: DzPromoModal,
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dzFigmaWhite',
    },
  },
};

export default meta;

const Template: Story<ComponentProps<typeof DzPromoModal>> = args => (
  <DzPromoModal {...args} />
);

export const PrimaryDzPromoModal = Template.bind({});
PrimaryDzPromoModal.args = {
  isOpen: true,
  linkText: 'Explore',
  imgProps: {
    src:
      'https://cdn.sanity.io/images/juzvn5an/test/eb12cba8eedbe3d418d0f6ad8db889d55862006d-1080x1920.jpg?w=2000&fit=max&auto=format',
    alt: 'leaf',
  },
  url: 'https://www.davidzwirner.com/',
  title: 'Utopia Editions: Lucas Arruda',
  subtitle:
    'A new etching by Lucas Arruda echoes the artist’s meditative approach to painting.',
};
