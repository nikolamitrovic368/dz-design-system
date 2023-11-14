import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DzHeader, DzHeaderProps } from '../../src/layout/header/DzHeader';
import { menuData } from '../../constants/mocks/DzHeader';
import { footerData } from '../../constants/mocks/DzFooter';

const meta: Meta = {
  title: 'Layout/Navigation/DzHeader',
  component: DzHeader,
  argTypes: {
    newsletterAction: { action: 'clicked newsletterAction' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DzHeaderProps> = args => <DzHeader {...args} />;

export const DzPrimaryHeader = Template.bind({});
DzPrimaryHeader.args = { menu: menuData, footerData };

export const DzHeaderWithRouter = Template.bind({});
DzHeaderWithRouter.args = {
  menu: menuData,
  linkProps: { router: { asPath: '/artists' }, useRoute: true },
  footerData,
};

export const DzHeaderWithRouterNested = Template.bind({});
DzHeaderWithRouterNested.args = {
  menu: menuData,
  linkProps: { router: { asPath: '/exhibitions/tomma' }, useRoute: true },
  footerData,
};
