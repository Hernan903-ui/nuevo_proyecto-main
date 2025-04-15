import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPassword from './ResetPassword';
import config from '../config';

jest.mock('../config', () => ({
  apiUrl: 'http://localhost:5000/api',
}));

describe('ResetPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful reset password', async () => {
    const mockResponse = { message: 'Password reset successful' };
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    global.fetch = mockFetch;

    render(<ResetPassword />);

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Restablecer Contraseña/i));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledWith(`${config.apiUrl}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@example.com' }),
    });
    expect(screen.getByText(/Éxito/i)).toBeInTheDocument();  });

  it('should handle failed reset password', async () => {
    const mockError = new Error('Failed to reset password');
    const mockFetch = jest.fn().mockRejectedValue(mockError);
    global.fetch = mockFetch;

    render(<ResetPassword />);

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Restablecer Contraseña/i));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
  it('should handle failed reset password with ok:false', async () => {
    const mockResponse = { message: 'Failed to reset password' };
    const mockFetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(mockResponse),
    });
    global.fetch = mockFetch;
    render(<ResetPassword />);
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText(/Restablecer Contraseña/i));
    await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(screen.getByText(/Error/i)).toBeInTheDocument();
      });
  });
});