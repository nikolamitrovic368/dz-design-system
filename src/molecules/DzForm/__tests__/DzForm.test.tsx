import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DzForm from '../DzForm';
import { inquireFormSteps } from '../../DzFormModal/formSteps/inquireFormSteps';

jest.mock('@vime/react', () => ({
  Player: () => <></>,
  Youtube: () => <></>,
  DefaultUi: () => <></>,
  Vimeo: () => <></>,
  Video: () => <></>,
}));

const fields = inquireFormSteps[0].formSections[0].fields;
const firstNamePH = fields[0].placeholder;
const lastNamePH = fields[1].placeholder;
const emailPH = fields[2].placeholder;
const phonePH = fields[3].placeholder;
const commentsPH = fields[4].placeholder;
const inquireButtonText = inquireFormSteps[0].CTAProps.text;

describe('DzForm', () => {
  describe('Inquiry Form', () => {
    beforeEach(() => {
      render(<DzForm steps={inquireFormSteps} onSubmit={() => {}} />);
    });

    test('validates required fields', () => {
      expect(screen.getByPlaceholderText(firstNamePH)).toBeRequired();
      expect(screen.getByPlaceholderText(lastNamePH)).toBeRequired();
      expect(screen.getByPlaceholderText(emailPH)).toBeRequired();
      expect(screen.getByPlaceholderText(phonePH)).not.toBeRequired();
      expect(screen.getByPlaceholderText(commentsPH)).not.toBeRequired();
      expect(screen.getByRole('button')).toBeDisabled();

      fireEvent.input(screen.getByPlaceholderText(firstNamePH), {
        target: { value: 'john' },
      });
      fireEvent.input(screen.getByPlaceholderText(lastNamePH), {
        target: { value: 'smith' },
      });
      fireEvent.input(screen.getByPlaceholderText(emailPH), {
        target: { value: 'johnsmith@google.com' },
      });
      expect(screen.getByRole('button')).toBeEnabled();
    });
  });
});
