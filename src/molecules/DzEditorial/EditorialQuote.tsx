import React, { ReactNode } from 'react';
import { cn } from '../../utils/classnames';
import { DzTitle, TITLE_TYPES } from '../../atoms';

export type EditorialQuoteProps = {
  quote?: string;
  quoteDetail?: string;
  portableTextQuote?: ReactNode;
  portableTextQuoteDetail?: ReactNode;
};

const styles: any = {
  editorialContainer: `
    flex
    gap-10
    md:gap-5
    w-full
    relative
  `,
  singleQuoteContainer: `
    flex
    flex-col
    mx-auto
    max-w-[57.8125rem]
    text-center
    gap-5
    md:gap-10
  `,
  singleQuote: `
    text-xl
    md:text-xxl
  `,
  quoteDetail: `
    text-sm
    md:text-lg
  `,
};

export const EditorialQuote = ({
  quote,
  quoteDetail,
  portableTextQuote,
  portableTextQuoteDetail,
}: EditorialQuoteProps) => {
  if (
    !quote &&
    !quoteDetail &&
    !portableTextQuote &&
    !portableTextQuoteDetail
  ) {
    return null;
  }
  return (
    <div className={cn(styles.editorialContainer)}>
      <div className={cn(styles.singleQuoteContainer)}>
        {quote ? (
          <DzTitle
            classNameTitle={cn(styles.singleQuote)}
            titleType={TITLE_TYPES.P}
            title={quote}
          />
        ) : null}
        {portableTextQuote ? portableTextQuote : null}
        {quoteDetail ? (
          <DzTitle
            classNameTitle={cn(styles.quoteDetail)}
            titleType={TITLE_TYPES.P}
            title={quoteDetail}
          />
        ) : null}
        {portableTextQuoteDetail ? portableTextQuoteDetail : null}
      </div>
    </div>
  );
};

export default EditorialQuote;
