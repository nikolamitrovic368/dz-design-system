import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
  DzMedia,
  DzMediaProps,
  MEDIA_TYPES,
  MEDIA_VIDEO_SOURCE_TYPES,
  MEDIA_VIDEO_TYPES,
} from '../../src/atoms/DzMedia';
import { vimeoProps, youtubeProps } from '../../constants/mocks/DzMedia';

const meta: Meta = {
  title: 'Atoms/Media/DzMedia',
  component: DzMedia,
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'dzFigmaWhite',
    },
  },
};

export default meta;

const Template: Story<DzMediaProps> = args => <DzMedia {...args} />;

export const DzMediaVimeo = Template.bind({});
DzMediaVimeo.args = {
  type: MEDIA_TYPES.VIDEO,
  videoType: MEDIA_VIDEO_TYPES.INTERACTIVE_VIDEO,
  videoProps: {
    source: vimeoProps,
  },
  videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
};

export const DzMediaVimeoMovingImage = Template.bind({});
DzMediaVimeoMovingImage.args = {
  type: MEDIA_TYPES.VIDEO,
  videoType: MEDIA_VIDEO_TYPES.MOVING_IMAGE,
  videoProps: {
    source: vimeoProps,
  },
  videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.VIMEO,
};

export const DzMediaUrl = Template.bind({});
DzMediaUrl.args = {
  type: MEDIA_TYPES.VIDEO,
  videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.URL,

  sourceSet: (
    <source
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
      type="video/mp4"
    />
  ),
};

export const DzMediaYoutube = Template.bind({});
DzMediaYoutube.args = {
  type: MEDIA_TYPES.VIDEO,
  videoSourceType: MEDIA_VIDEO_SOURCE_TYPES.YOUTUBE,
  videoProps: {
    source: youtubeProps,
  },
};
