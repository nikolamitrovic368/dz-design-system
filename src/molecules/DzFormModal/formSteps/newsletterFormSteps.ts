import { isEmail } from '../../../utils';
import { FORM_FIELD_TYPES } from '../../DzForm/DzForm';
import { FormStep } from './types/formStep';
import { atLeastOneFieldValue } from '../../DzForm/validators/atLeastOneFieldValue';
export const newsletterFormSteps: Array<FormStep> = [
  {
    id: '2',
    formName: 'newsletterForm',
    title: '',
    primarySubtitle: '',
    CTAProps: {
      text: 'Sign Up',
      type: 'submit',
    },
    formValidator: {
      validator: atLeastOneFieldValue,
      args: [['news', 'access', 'events'], true],
      errorMessage: 'Please select at least one preference',
    },
    formSections: [
      {
        id: '1a',
        fields: [
          {
            name: 'email',
            placeholder: 'Enter your Email Address here',
            required: true,
            type: FORM_FIELD_TYPES.INPUT,
            span: 12,
            data: {
              type: 'email',
              validator: isEmail,
              errorMsg: 'Please enter a valid email address.',
            },
            className: 'mb-[1.25rem] md:mb-[2.5rem]',
          },
          {
            name: 'news',
            type: FORM_FIELD_TYPES.CHECKBOX,
            span: 12,
            initialValue: true,
            data: {
              title: 'News, Stories, Podcast, and Exhibition Updates',
              type: FORM_FIELD_TYPES.CHECKBOX,
            },
          },
          {
            name: 'access',
            type: FORM_FIELD_TYPES.CHECKBOX,
            span: 12,
            initialValue: true,
            data: {
              title: 'Online Viewing Rooms, Fairs, and Available Works',
              type: FORM_FIELD_TYPES.CHECKBOX,
            },
          },
          {
            name: 'events',
            type: FORM_FIELD_TYPES.CHECKBOX,
            span: 12,
            initialValue: true,
            data: {
              title: 'David Zwirner Books, News, and Events',
              type: FORM_FIELD_TYPES.CHECKBOX,
              errorMsg: 'Please enter a valid email address.',
            },
          },
        ],
      },
    ],
  },
];
