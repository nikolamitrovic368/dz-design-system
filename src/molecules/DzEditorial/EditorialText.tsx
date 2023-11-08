import React, { FC, ReactNode } from 'react';
import { DzText, TEXT_TYPES, TEXT_SIZES } from '../../atoms';
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
  text?: string;
  portableTextText?: ReactNode;
  type: EditorialTextType;
}
export interface EditorialTextProps {
  paragraphs?: EditorialPart[];
}

const styles: any = {
  singleParagraph: `
    text-sm
    md:text-md
    mb-5
  `,
  quote: `
    text-lg
    md:text-xl
    my-5
    md:my-10
  `,
};

export const EditorialText: FC<EditorialTextProps> = ({ paragraphs }) => {
  if (!paragraphs) return null;
  return (
    <>
      {paragraphs.map((p, k) => {
        const { portableTextText, text } = p ?? {};
        if (portableTextText)
          return (
            <div
              className={p.type === EDITORIAL_TEXT_TYPES.QUOTE ? 'my-5' : ''}
            >
              {portableTextText}
            </div>
          );
        if (p.type === EDITORIAL_TEXT_TYPES.PARAGRAPH) {
          return (
            <DzText
              key={`${p}-${k}`}
              className={cn(styles.singleParagraph)}
              text={text}
              textType={TEXT_TYPES.P}
            />
          );
        }
        return (
          <DzText
            key={`${p}-${k}`}
            className={cn(styles.quote)}
            textType={TEXT_TYPES.P}
            text={text}
            textSize={TEXT_SIZES.LARGE}
          />
        );
      })}
    </>
  );
};

export default EditorialText;
