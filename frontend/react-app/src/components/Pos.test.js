import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pos from './Pos';
import config from '../config';

jest.mock('../config', () => ({
  apiUrl: 'http://localhost:5000/api',
}));

describe('Pos Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should handle successful finalizeSale API call', async () => {
    const mockResponse = { success: true, message: 'Sale completed' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<Pos />);

    const finalizeButton = screen.getByText('pos.finish');
    userEvent.click(finalizeButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(`${config.apiUrl}/sales`, expect.anything());
  });

  it('should handle failed finalizeSale API call', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to complete sale' }),
      })
    );

    render(<Pos />);

    const finalizeButton = screen.getByText('pos.finish');
    userEvent.click(finalizeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });

  it('should handle network error during finalizeSale', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    render(<Pos />);

    const finalizeButton = screen.getByText('pos.finish');
    userEvent.click(finalizeButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});