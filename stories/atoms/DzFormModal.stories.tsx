import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { DzButton } from '../../src/atoms/DzButton';
import { DzFormModal, DzFormModalProps, FORM_MODAL_TYPES } from '../../src';

const meta: Meta = {
  title: 'Atoms/Modals/DzFormModal',
  component: DzFormModal,
  argTypes: {
    title: { type: 'string', defaultValue: 'Form Title' },
    subtitle: { type: 'string', defaultValue: 'Form Subtitle' },
    type: { type: 'string' },
  },
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dzFigmaWhite',
    },
  },
};

export default meta;

const Template: Story<DzFormModalProps> = args => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {!open ? (
        <DzButton onClick={() => setOpen(true)}>Open Modal</DzButton>
      ) : null}
      <DzFormModal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        LinkElement="a"
      />
    </>
  );
};

export const InquireDzFormModal = Template.bind({});
export const NewsetterDzFormModal = Template.bind({});
export const CustomNewsetterDzFormModal = Template.bind({});

InquireDzFormModal.args = {
  type: FORM_MODAL_TYPES.INQUIRE,
};

NewsetterDzFormModal.args = {
  type: FORM_MODAL_TYPES.NEWSLETTER,
};

CustomNewsetterDzFormModal.args = {
  type: FORM_MODAL_TYPES.NEWSLETTER,
  ImgElement: 'img',
  image: {
    src:
      'https://assets.davidzwirner.com/v7/_assets_/davidzwirner/galleries/gallery-cover-images/dz_gallery_20th_street_cover_image.jpg?w=1100&q=85&org_if_sml=1&force_format=webp',
    alt: 'test image',
  },
};
