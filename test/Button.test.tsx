import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { DzButton } from '../src/atoms/DzButton';

afterEach(cleanup);
describe('ATOMIC: DzButton test', () => {
  it('should render the button without crashing', () => {
    render(<DzButton>test</DzButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call the onClick method when a user clicks on the button', () => {
    const mockClick = jest.fn();
    render(<DzButton onClick={mockClick}>test</DzButton>);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
