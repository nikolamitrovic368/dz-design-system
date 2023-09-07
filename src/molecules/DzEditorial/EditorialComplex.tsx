import React, { FC } from 'react';
import { cn } from '../../utils/classnames';
import { DzMedia, DzMediaProps } from '../../atoms';
import { EditorialText, EditorialTextProps } from './EditorialText';

export interface EditorialComplexProps extends EditorialTextProps {
  media?: DzMediaProps;
  reverse?: boolean;
}

const styles: any = {
  editorialContainer: `
    flex
    flex-col
    md:flex-row
    gap-10
    md:gap-5
    w-full
    relative
    scroll-smooth
    whitespace-pre-wrap
  `,
  leftPane: `
    basis-1/2
    relative
    md:sticky
    top-0
    h-fit
  `,
  rightPane: `
    flex
    flex-col
    basis-1/2
  `,
};

export const EditorialComplex: FC<EditorialComplexProps> = ({
  media,
  paragraphs,
  reverse = false,
}) => {
  return (
    <div
      className={cn(
        styles.editorialContainer,
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      )}
    >
      {media ? (
        <div className={cn(styles.leftPane)}>
          <DzMedia {...media} />
        </div>
      ) : null}
      <div className={cn(styles.rightPane)}>
        <EditorialText paragraphs={paragraphs} />
      </div>
    </div>
  );
};

export default EditorialComplex;
