import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';
import config from '../config';

const mockConfig = {
  apiUrl: 'http://test.com/api',
};

jest.mock('../config', () => ({
  __esModule: true,
  default: {
    ...mockConfig,
  },
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should handle successful registration', async () => {
    const mockResponse = { status: 201, json: async () => ({ message: 'User registered successfully' }) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/register`, expect.anything());
      expect(screen.getByText(/User registered successfully/i)).toBeInTheDocument();
    });
  });

  it('should handle failed registration', async () => {
    const mockResponse = { status: 500, json: async () => ({ error: 'Internal Server Error' }) };
    jest.spyOn(global, 'fetch').mockResolvedValue(mockResponse);

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/register`, expect.anything());
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
      expect(console.error).toHaveBeenCalled();
    });
  });

  it('should handle network error', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrar/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
      expect(console.error).toHaveBeenCalled();
    });
  });
});