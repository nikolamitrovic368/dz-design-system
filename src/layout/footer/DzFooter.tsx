import React, { useMemo, useRef } from 'react';
import { DzText } from '../../atoms';
import { DzLink } from '../../atoms';
import { cn } from '../../utils/classnames';
import BoldWeChatIcon from '../../svgIcons/boldWeChat';
import BoldTwitterIcon from '../../svgIcons/boldTwitter';
import BoldFacebookIcon from '../../svgIcons/boldFacebook';
import BoldInstagramIcon from '../../svgIcons/boldInstagram';
import BoldNewsletterIcon from '../../svgIcons/boldNewsletter';
import { BREAKPOINTS } from '../../layout/breakpoints';
import useWindowSize from '../../hooks/useWindowSize';
import useHover from '../../hooks/useHover';

export type FooterData = {
  copies: Copies;
  links: Link[];
  socialMedia: SocialMedia;
};

type SocialMedia = {
  _type: string;
  weChat: string;
  instagram: string;
  twitter: string;
  facebook: string;
};

type Link = {
  _key: string;
  _type: string;
  newTab: boolean;
  mobileEnabled: boolean;
  desktopEnabled: boolean;
  link?: string;
  title: string;
  anchor?: string;
  page?: Page;
};

type Page = {
  url: string;
};

type Copies = {
  rights: string;
};

export type DzFooterProps = {
  data: FooterData;
  newsletterAction: Function;
  footerClass?: string;
  isOnHeader?: boolean;
  LinkElement: any;
};

const styles: any = {
  footer: `
    bg-white-100
  `,
  linksContainer: `
    w-full
    flex
    flex-wrap
    gap-5
    justify-center
    min-w-fit
    md:justify-start
  `,
  socialContainer: `
    flex
    flex-wrap
    gap-[calc(100vw*0.13)]
    md:gap-[calc(100vw*0.03555555)]
    w-full
    md:justify-end
    pt-2
    md:pt-0
    justify-center
    items-center
  `,
  bottomContainer: `
    px-5
    py-[40px]
    md:py-[2.125rem]
    flex
    flex-col
    gap-10
    md:gap-5
    items-center
    md:flex-row
    justify-between
  `,
  copyright: `
    w-full
    min-w-fit
    text-center
    md:w-fit
    md:text-left
  `,
  leftContainer: `
    w-full
    flex
    flex-col
    md:flex-row
    md:gap-5
    gap-[1.875rem]
  `,
  divider: `
    md:hidden
    bg-black-20
  `,
  link: `
    text-center
  `,
};
export const DzFooter = ({
  data,
  newsletterAction = () => null,
  footerClass = '',
  isOnHeader = false,
  LinkElement = 'a',
}: DzFooterProps) => {
  const { width } = useWindowSize();
  const isSmall = useMemo(() => {
    return width <= BREAKPOINTS.MD;
  }, [width]);
  const twitterHover = useRef<any>(null);
  const isTwitterHover = useHover(twitterHover);

  const facebookHover = useRef<any>(null);
  const isFacebookHover = useHover(facebookHover);

  const instagramHover = useRef<any>(null);
  const isInstagramHover = useHover(instagramHover);

  const weChatHover = useRef<any>(null);
  const isWeChatHover = useHover(weChatHover);

  const newsletterHover = useRef<any>(null);
  const isNewsletterHover = useHover(newsletterHover);

  const { links = [], socialMedia, copies } = data ?? {};
  const { weChat, instagram, twitter, facebook } = socialMedia ?? {
    weChat: '',
    instagram: '',
    twitter: '',
    facebook: '',
  };
  return (
    <footer
      className={cn(styles.footer, footerClass)}
      aria-label="Footer"
      role="contentinfo"
    >
      {!isOnHeader ? <hr className={cn(styles.divider)} /> : null}

      <div className={cn(styles.bottomContainer)}>
        <div className={cn(styles.leftContainer)}>
          {copies?.rights ? (
            <DzText className={cn(styles.copyright)} text={copies?.rights} />
          ) : null}

          <div className={cn(styles.linksContainer)}>
            {links.map((linkData, position) => {
              const {
                _type,
                title = '',
                anchor = '',
                page = { url: '' },
                link = '',
                _key,
                mobileEnabled,
                desktopEnabled,
                newTab,
              } = linkData;
              if (isSmall && !mobileEnabled) return null;
              if (!isSmall && !desktopEnabled) return null;
              const url = _type === 'menuItemPage' ? page?.url : link;
              const urlWithAnchor = `${url}#${anchor}`;
              return (
                <DzLink
                  id={_key}
                  key={`${_key}-${position}`}
                  href={urlWithAnchor}
                  openNewTab={newTab}
                  className={styles.link}
                  LinkElement={LinkElement}
                >
                  {title}
                </DzLink>
              );
            })}
          </div>
        </div>
        <div className={cn(styles.socialContainer)}>
          {twitter ? (
            <DzLink
              href={twitter}
              ref={twitterHover}
              openNewTab
              LinkElement={LinkElement}
            >
              <BoldTwitterIcon fill={isTwitterHover ? '#757575' : 'black'} />
            </DzLink>
          ) : null}

          {facebook ? (
            <DzLink
              href={facebook}
              ref={facebookHover}
              openNewTab
              LinkElement={LinkElement}
            >
              <BoldFacebookIcon fill={isFacebookHover ? '#757575' : 'black'} />
            </DzLink>
          ) : null}
          {instagram ? (
            <DzLink
              href={instagram}
              ref={instagramHover}
              openNewTab
              LinkElement={LinkElement}
            >
              <BoldInstagramIcon
                fill={isInstagramHover ? '#757575' : 'black'}
              />
            </DzLink>
          ) : null}

          {weChat ? (
            <DzLink
              href={weChat}
              ref={weChatHover}
              openNewTab
              LinkElement={LinkElement}
            >
              <BoldWeChatIcon fill={isWeChatHover ? '#757575' : 'black'} />
            </DzLink>
          ) : null}

          <button
            className="cursor-pointer"
            onClick={() => newsletterAction()}
            ref={newsletterHover}
          >
            <BoldNewsletterIcon
              fill={isNewsletterHover ? '#757575' : 'black'}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default DzFooter;
