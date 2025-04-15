import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Reports from './Reports';
import config from '../config';
import '@testing-library/jest-dom';

// Mock the config module
jest.mock('../config', () => ({
  apiUrl: 'http://localhost:5000/api'
}));
// Mock the fetch API
global.fetch = jest.fn();

describe('Reports Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches and displays most sold data successfully', async () => {
    const mockData = [{ id: 1, name: 'Product 1', quantity: 10 }, { id: 2, name: 'Product 2', quantity: 5 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Reports />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-sold');
  });

  it('handles errors when fetching most sold data', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<Reports />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });

  it('fetches and displays most profitable data successfully', async () => {
    const mockData = [{ id: 1, name: 'Product 1', profit: 100 }, { id: 2, name: 'Product 2', profit: 50 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<Reports />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-profitable');
  });

  it('handles errors when fetching most profitable data', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<Reports />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});