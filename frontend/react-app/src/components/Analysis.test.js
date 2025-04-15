import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Analysis from './Analysis';
import config from '../config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock the fetch API
global.fetch = jest.fn();
jest.mock('../config');

describe('Analysis Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays most sold data successfully', async () => {
    const mockMostSoldData = [{ id: 1, name: 'Product 1', quantitySold: 10 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMostSoldData,
    });

    render(<Analysis />);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-sold');
    await waitFor(() => {
        expect(screen.getByText("analysis.chart1")).toBeInTheDocument();
    });
  });

  it('handles error when fetching most sold data fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<Analysis />);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-sold');

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });

  it('fetches and displays most profitable data successfully', async () => {
    const mockMostProfitableData = [{ id: 1, name: 'Product 1', profit: 100 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMostProfitableData,
    });

    render(<Analysis />);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-profitable');
    await waitFor(() => {
        expect(screen.getByText("analysis.chart2")).toBeInTheDocument();
    });
  });

  it('handles error when fetching most profitable data fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<Analysis />);

    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/most-profitable');
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });
});