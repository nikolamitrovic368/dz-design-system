import { DzButtonProps } from '../../atoms';

export type SectionMenuCTA = {
  text: string;
  ctaProps?: DzButtonProps;
};

export type SectionNavItem = {
  text: string;
  id: string;
  url?: string;
  hidden?: boolean;
};
