import React from 'react';
import { PropsWithChildren } from 'react';
import { cn } from '../utils/classnames';

export const SECTION_SCROLL_TOP_MARGIN = '120px';

const styles: any = {
  sectionContainer: `
    scroll-mt-[120px]
  `,
};
type DzSectionProps = PropsWithChildren & { id: string; className?: string };

export const DzSection = ({ children, className, id }: DzSectionProps) => (
  <section id={id} className={cn(styles.sectionContainer, className || '')}>
    {children}
  </section>
);

export default DzSection;
