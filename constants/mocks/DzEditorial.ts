import { MEDIA_TYPES } from '../../src/atoms/DzMedia';
import { EDITORIAL_TEXT_TYPES } from '../../src/molecules/DzEditorial/EditorialText';
import { EditorialComplexProps } from '../../src/molecules/DzEditorial/EditorialComplex';
import { EditorialSimpleProps } from '../../src/molecules/DzEditorial/EditorialSimple';
import { EditorialQuoteProps } from '../../src/molecules/DzEditorial/EditorialQuote';

export const simple: EditorialSimpleProps = {
  paragraphs: [
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        ' Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies',
    },
    {
      type: EDITORIAL_TEXT_TYPES.QUOTE,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m.',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        ' Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies',
    },
  ],
};

export const complex: EditorialComplexProps = {
  LinkElement: 'a',
  media: {
    url: '/',
    type: MEDIA_TYPES.IMAGE,
    imgProps: {
      src:
        'https://assets.davidzwirner.com/v7/_assets_/davidzwirner/exhibitions/2023/franz-west-19th-st/final---ew-branding/install-version-2/flex_fwdz19show2023_install_v16_scale_1_alt.jpg?w=2300&q=85&org_if_sml=1&force_format=webp',
      alt: 'artwork',
    },
  },
  reverse: true,
  paragraphs: [
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        ' Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum.',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.QUOTE,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m.',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
    },
    {
      type: EDITORIAL_TEXT_TYPES.PARAGRAPH,
      text:
        ' Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies',
    },
  ],
};

export const quote: EditorialQuoteProps = {
  quote:
    '”Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu”',
  quoteDetail: '— Lorem ipsum dolor sit amet, consectetuer adipiscin',
};
