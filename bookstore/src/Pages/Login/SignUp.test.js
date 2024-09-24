
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SignUp from './SignUp';
import { userSignUp } from '../../Services/user_service'; 

// Mock the userSignUp function
jest.mock('../../Services/user_service', () => ({
  userSignUp: jest.fn(),
}));

describe('SignUp Component', () => {
  // Test for rendering the SignUp component
  it('renders the SignUp component', () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/EmailId/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  // Test for checking the class name of an element (if any)
  it('has the correct class name for the Box component', () => {
    render(<SignUp />);
    const boxElement = screen.getByRole('form'); // Assuming Box is used as form
    expect(boxElement).toHaveClass('MuiBox-root'); // Example class name; adjust as needed
  });

  // Test for checking fullName input
  it('checks the fullName input', () => {
    render(<SignUp />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    expect(fullNameInput.value).toBe('John Doe');
  });

  // Test for checking email input
  it('checks the email input', () => {
    render(<SignUp />);
    const emailInput = screen.getByLabelText(/EmailId/i);
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  // Test for checking password input
  it('checks the password input', () => {
    render(<SignUp />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    expect(passwordInput.value).toBe('Password123!');
  });

  // Test for checking phone number input
  it('checks the phone number input', () => {
    render(<SignUp />);
    const phoneInput = screen.getByLabelText(/Mobile Number/i);
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    expect(phoneInput.value).toBe('9876543210');
  });

  // Test for checking the Sign Up button
  it('clicks the Sign Up button', async () => {
    userSignUp.mockResolvedValue({ data: { result: 'Success' } }); // Mock response
    render(<SignUp />);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    fireEvent.click(signUpButton);
    expect(userSignUp).toHaveBeenCalled();
  });
});
