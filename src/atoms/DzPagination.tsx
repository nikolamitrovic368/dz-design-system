import React, { FC, ReactNode } from 'react';
import { cn } from '../utils/classnames';
import { usePagination, DOTS } from '../hooks/usePagination';

import { ArrowLeft } from '../svgIcons/arrowLeft';
import { ArrowRight } from '../svgIcons/arrowRight';

export interface DzPaginationProps {
  prevText: string;
  nextText: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange?: Function;
  renderPageNumber: (pageNumber: number) => ReactNode;
}

const styles = {
  paginationContainer: `
    flex
    items-center
    justify-between
    px-4
    sm:px-0
  `,
  underline: `
    decoration-transparent
    duration-300
    ease-in
    underline-offset-[0.375rem]
    decoration-1
    transition-text-decoration
    hover:underline
    hover:decoration-current
    decoration-black-60 
  `,
  previousContainer: `
    inline-flex
    items-center
    pt-4
    pr-1
    text-sm
    font-medium
    text-black-60
    cursor-pointer
    hover:text-black-100
  `,
  dots: `
    inline-flex
    items-center
    border-t-2
    border-transparent
    px-4
    pt-4
    text-sm
    font-medium
    text-black-60
  `,
  selectedPage: `
    inline-flex
    items-center
    px-4
    pt-4
    text-sm
    font-medium
    text-black-100
  `,
  pageNumber: `
    inline-flex
    items-center
    px-4
    pt-4
    text-sm
    cursor-pointer
    font-medium
    text-black-60
    hover:text-black-100
  `,
  nextContainer: `
    inline-flex
    items-center
    pt-4
    pl-1
    text-sm
    font-medium
    text-black-60
    cursor-pointer
    hover:text-black-100
  `,
  disabledArrow: `    
    opacity-50
  `,
  defaultCursor: `
    !cursor-default
  `,
};

export const DzPagination: FC<DzPaginationProps> = ({
  prevText,
  nextText,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  renderPageNumber,
}) => {
  const paginationRange = usePagination(totalCount, currentPage, pageSize);
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === paginationRange.length;
  const onNext = () => {
    if (!isNextDisabled) {
      onPageChange?.(currentPage + 1);
    }
  };
  const onPrevious = () => {
    if (!isPreviousDisabled) {
      onPageChange?.(currentPage - 1);
    }
  };

  return (
    <div className={cn(styles.paginationContainer)}>
      <div className="-mt-px flex w-0 flex-1">
        <div
          className={cn(
            styles.previousContainer,
            styles.underline,
            isPreviousDisabled ? styles.defaultCursor : ''
          )}
          onClick={onPrevious}
        >
          <ArrowLeft
            className={cn(
              'mr-3 h-5 w-5',
              isPreviousDisabled ? styles.disabledArrow : ''
            )}
            aria-hidden="true"
          />
          {prevText}
        </div>
      </div>
      <div className="md:-mt-px md:flex">
        {paginationRange.map(page => {
          const selected = page === currentPage;
          if (page === DOTS) {
            return (
              <span key={page} className={cn(styles.dots)}>
                ...
              </span>
            );
          }
          return (
            <div
              className={cn(
                selected ? styles.selectedPage : styles.pageNumber,
                styles.underline
              )}
              key={page}
            >
              {renderPageNumber ? renderPageNumber(page as number) : page}
            </div>
          );
        })}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <div
          className={cn(
            styles.nextContainer,
            styles.underline,
            isNextDisabled ? styles.defaultCursor : ''
          )}
          onClick={onNext}
        >
          {nextText}
          <ArrowRight
            className={cn(
              'ml-3 h-5 w-5',
              isNextDisabled ? styles.disabledArrow : ''
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default DzPagination;
