import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DzCarousel } from '../../src/molecules/DzCarousel/DzCarousel';
import { CARD_TYPES, DataCardType, DzCard } from '../../src/molecules/DzCard';
import { DzGridColumns, DzColumn } from '../../src/layout/DzGrid';
import { contentData } from '../../constants/mocks/DzCard';
import {
  DzCarouselCardSize,
  DzCarouselProps,
} from '../../src/molecules/DzCarousel/types';

const meta: Meta = {
  title: 'Molecules/Elements/DzCarousel',
  component: DzCarousel,
  parameters: {},
};

export default meta;

const GridColumnsDebug = () => (
  <DzGridColumns
    position="absolute"
    className="absolute top-0 left-0 px-5 w-full h-full pointer-events-none m-0"
  >
    {Array.from(Array(12)).map((_, i) => (
      <DzColumn
        className="z-10 bg-green-10 border h-screen"
        key={i}
        span={[1]}
      />
    ))}
  </DzGridColumns>
);

const Template: Story<DzCarouselProps & { showGrid: boolean }> = args => (
  <>
    <DzCarousel {...args} size={args.size || DzCarouselCardSize.XL}>
      {Array(10)
        .fill(null)
        .map(_ => (
          <DzCard
            {...{
              data: contentData as DataCardType,
              type: CARD_TYPES.CONTENT,
            }}
            LinkElement={'a'}
          />
        ))}
    </DzCarousel>
    {args.showGrid && GridColumnsDebug()}
  </>
);

export const PrimaryDzCarousel = Template.bind({});
PrimaryDzCarousel.args = { showGrid: true };
