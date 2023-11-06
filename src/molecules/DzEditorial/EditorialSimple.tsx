import React, { FC } from 'react';
import { EditorialText, EditorialTextProps } from './EditorialText';
import { cn } from '../../utils/classnames';

export interface EditorialSimpleProps extends EditorialTextProps {
  isWide?: boolean;
}

const styles: any = {
  editorialContainer: `
    flex
    gap-10
    md:gap-5
    w-full
    relative
    scrollbar-w-none
    `,
  editorialColsContainer: `
    md:grid
    md:grid-cols-12
  `,
  rightPane: `
    md:basis-1/2
    flex
    flex-col
  `,
  rightPaneWide: `
    md:col-span-8
  `,
};

export const EditorialSimple: FC<EditorialSimpleProps> = ({
  paragraphs,
  isWide = false,
}) => {
  return (
    <div
      className={cn(
        styles.editorialContainer,
        isWide ? styles.editorialColsContainer : ''
      )}
    >
      <div
        className={cn(
          styles.rightPane,
          isWide ? styles.rightPaneWide : 'mx-auto'
        )}
      >
        <EditorialText paragraphs={paragraphs} />
      </div>
    </div>
  );
};

export default EditorialSimple;
