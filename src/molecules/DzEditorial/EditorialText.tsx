import React, { FC } from 'react';
import { DzText, DzTitle, TEXT_TYPES, TITLE_TYPES } from '../../atoms';
import { cn } from '../../utils/classnames';

export const EDITORIAL_TEXT_TYPES = {
  PARAGRAPH: 'paragraph',
  QUOTE: 'quote',
};

export const EDITORIAL_TEXT_NAMES = [
  EDITORIAL_TEXT_TYPES.PARAGRAPH,
  EDITORIAL_TEXT_TYPES.QUOTE,
] as const;

export type EditorialTextType = typeof EDITORIAL_TEXT_NAMES[number];

export interface EditorialPart {
  text: string;
  type: EditorialTextType;
}
export interface EditorialTextProps {
  paragraphs?: EditorialPart[];
}

const styles: any = {
  singleParagraph: `
    text-sm
    md:text-md
  `,
  quote: `
    text-lg
    md:text-xl
  `,
};

export const EditorialText: FC<EditorialTextProps> = ({ paragraphs }) => {
  if (!paragraphs) return null;
  return (
    <>
      {paragraphs.map(p => {
        if (p.type === EDITORIAL_TEXT_TYPES.PARAGRAPH) {
          return (
            <DzText
              className={cn(styles.singleParagraph)}
              text={p.text}
              textType={TEXT_TYPES.P}
            />
          );
        }
        return (
          <DzTitle
            classNameTitle={cn(styles.quote)}
            titleType={TITLE_TYPES.H3}
            title={p.text}
          />
        );
      })}
    </>
  );
};

export default EditorialText;