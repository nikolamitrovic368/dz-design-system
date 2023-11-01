export const videoProps = {
  type: 'video',
  title: 'Example title',
  sources: [
    {
      src: '/path/to/movie.mp4',
      type: 'video/mp4',
      size: 720,
    },
    {
      src: '/path/to/movie.webm',
      type: 'video/webm',
      size: 1080,
    },
  ],
  poster: '/path/to/poster.jpg',
  previewThumbnails: {
    src: '/path/to/thumbnails.vtt',
  },
  tracks: [
    {
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src: '/path/to/captions.en.vtt',
      default: true,
    },
    {
      kind: 'captions',
      label: 'French',
      srclang: 'fr',
      src: '/path/to/captions.fr.vtt',
    },
  ],
};

// src property for YouTube and Vimeo can either be the video ID or the whole URL.

export const vimeoProps = {
  type: 'video',
  posterImage:
    ' https://cdn.sanity.io/images/juzvn5an/test/063d52ef713f4f4aaca45a5a2955999d5ae26ef5-1280x853.jpg',
  sources: [
    {
      src: '64074037',
      provider: 'vimeo',
    },
  ],
};

export const youtubeProps = {
  type: 'video',
  sources: [
    {
      src: 'lLWOcE91_T4',
      provider: 'youtube',
    },
  ],
};
