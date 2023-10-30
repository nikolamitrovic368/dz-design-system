import React, { HTMLAttributes } from 'react';

export interface DzSpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any;
  link: string;
  width?: number | string;
  height?: number | string;
  frameBorder?: number | string;
  allow?: string;
  className?: string;
  loading?: 'eager' | 'lazy' | undefined;
}

export const DzSpotify = ({
  title = 'Spotify Web Player',
  link,
  className = '',
  style = {},
  width = '100%',
  height = '100%',
  frameBorder = 0,
  loading = 'lazy',
  allow = 'clipboard-write; encrypted-media; picture-in-picture;',
  ...props
}: DzSpotifyProps) => {
  if (!link) return null;
  const url = new URL(link);
  return (
    <iframe
      className={className}
      loading={loading}
      title={title}
      src={`https://open.spotify.com/embed${url.pathname}`}
      width={width}
      height={height}
      frameBorder={frameBorder}
      allow={allow}
      style={{
        borderRadius: 8,
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
};

export default DzSpotify;
