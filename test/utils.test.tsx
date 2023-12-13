import '@testing-library/jest-dom';
import { matchInternalPath } from '../src/atoms/DzLink';
import { CURRENT_ARTIST_URLS, ARTISTS_SUB_PAGES } from './mocks/urls';

describe('Utils::', () => {
  it('Artists:: Match Internal Path with full domains', () => {
    expect(
      CURRENT_ARTIST_URLS.map(url => matchInternalPath(url)).every(x => x)
    ).toBeTruthy();
  });
  it('Artists:: Match Internal Path without domains', () => {
    expect(
      CURRENT_ARTIST_URLS.map(url =>
        matchInternalPath(url.replace('https://www.davidzwirner.com', ''))
      ).every(x => x)
    ).toBeTruthy();
  });
  it('Artists:: Match Internal Subpages', () => {
    var randomArtist = CURRENT_ARTIST_URLS.sort(function() {
      return 0.5 - Math.random();
    })[0];
    expect(
      ARTISTS_SUB_PAGES.map(subpage =>
        matchInternalPath(`${randomArtist}${subpage}`)
      ).every(x => x)
    ).toBeTruthy();
  });
  it('Artists:: Match thomas ruff', () => {
    expect(
      matchInternalPath('/artists/thomas-ruff/survey/d.o.p.e')
    ).toBeTruthy();
  });
});
