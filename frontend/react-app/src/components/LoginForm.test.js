import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import config from '../config';

// Mock the config file
jest.mock('../config', () => ({
  apiUrl: 'http://localhost:5000/api',
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should handle successful login', async () => {
    const mockResponse = { success: true, message: 'Login successful' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      });
    });
  });

  it('should handle failed login', async () => {
    const mockResponse = { success: false, message: 'Invalid credentials' };
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => mockResponse,
    });

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const errorMessage = screen.getByText(/An error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const errorMessage = screen.getByText('An error occurred');
    expect(errorMessage).toBeInTheDocument();
  });
});