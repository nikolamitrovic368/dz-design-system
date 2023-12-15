import { render } from '@testing-library/react';
import { DzLink, isValidUrl, matchInternalPath } from '../DzLink';
import React from 'react';

const tets = (undefined as unknown) as any;

describe.skip('DzLink Error Future', () => {
  it('should throw an error when href prop is undefined', () => {
    expect(() =>
      render(
        <DzLink LinkElement="a" href={tets}>
          Hello Doug!
        </DzLink>
      )
    ).toThrow('href prop is required');
  });

  it('should throw an error when href prop is an empty string', () => {
    expect(() =>
      render(
        <DzLink LinkElement="a" href={''}>
          Hello Doug!
        </DzLink>
      )
    ).toThrow('href prop is required');
  });
});

describe('DzLink', () => {
  describe("when LinkElement is 'a'", () => {
    it('should render an anchor tag', () => {
      const { getByRole } = render(
        <DzLink LinkElement="a" href="https://google.com">
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', 'https://google.com');
    });

    it('should render with default href when href prop is undefined', () => {
      const { getByRole } = render(
        <DzLink LinkElement="a" href={tets}>
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', '/404');
    });

    it('should render with default href when href prop is an empty string', () => {
      const { getByRole } = render(
        <DzLink LinkElement="a" href="">
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', '/404');
    });

    it('should render a link with relative path when passed a relative path', () => {
      const { getByRole } = render(
        <DzLink LinkElement="a" href="/relative/path">
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', '/relative/path');
    });

    it('should render a link with partial url', () => {
      const { getByRole } = render(
        <DzLink LinkElement="a" href={'google.com'}>
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', 'google.com');
    });
  });

  describe("when LinkElement is 'span'", () => {
    it('should render a span tag', () => {
      const { getByText } = render(
        <DzLink LinkElement="span" href="https://google.com">
          Hello Doug!
        </DzLink>
      );
      const span = getByText('Hello Doug!');
      expect(span).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe("when LinkElement is passed anything besides a or span'", () => {
    it('should render with default href when href prop is undefined', () => {
      const { getByRole } = render(
        <DzLink LinkElement="Link" href={tets}>
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', '/404');
    });

    it('should render with default href when href prop is an empty string', () => {
      const { getByRole } = render(
        <DzLink LinkElement="Link" href="">
          Hello Doug!
        </DzLink>
      );
      const link = getByRole('link');
      expect(link).toHaveAttribute('href', '/404');
    });

    describe('when href is external link', () => {
      it('should render a link with external link', () => {
        const { getByRole } = render(
          <DzLink LinkElement="DOESNT_MATTER" href="https://google.com">
            Hello Doug!
          </DzLink>
        );
        const link = getByRole('link');
        expect(link).toHaveAttribute('href', 'https://google.com');
      });

      it('should render a link with relative path when passed a relative path', () => {
        const { getByRole } = render(
          <DzLink LinkElement="DOESNT_MATTER" href="/relative/path">
            Hello Doug!
          </DzLink>
        );
        const link = getByRole('link');
        expect(link).toHaveAttribute('href', '/relative/path');
      });
    });

    describe('when href is internal link', () => {
      it('should render the passed LinkElement component', () => {
        const { getByRole } = render(
          <DzLink LinkElement="main" href="/artists">
            Hello Doug!
          </DzLink>
        );
        const link = getByRole('main');
        expect(link).toHaveAttribute('href', '/artists');
      });
    });
  });
});

describe('matchInternalPath', () => {
  it('should return true when the URL matches an internal path', () => {
    const url = '/artists';
    const result = matchInternalPath(url);
    expect(result).toBe(true);
  });

  it('should return false when the URL does not match an internal path', () => {
    const url = '/external/path';
    const result = matchInternalPath(url);
    expect(result).toBe(false);
  });
});

describe('isValidUrl', () => {
  it('should return false on a partial url', () => {
    const url = 'google.com';
    const result = isValidUrl(url);
    expect(result).toBe(false);
  });
  it('should return false on a relative path', () => {
    const url = '/relative/path';
    const result = isValidUrl(url);
    expect(result).toBe(false);
  });

  it('should return true on a full url', () => {
    const url = 'https://google.com';
    const result = isValidUrl(url);
    expect(result).toBe(true);
  });
});
