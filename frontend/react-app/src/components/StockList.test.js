import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StockList from './StockList';
import config from '../config';

jest.mock('../config', () => ({
  apiUrl: 'http://test-api.com/api',
}));

global.fetch = jest.fn();

describe('StockList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should fetch low stock products and display them', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', stock: 5 },
      { id: 2, name: 'Product 2', stock: 2 },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<StockList />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/stock/low`);
    });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should display an error message when fetching low stock products fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<StockList />);

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar los productos con bajo stock/i)).toBeInTheDocument();
    });
  });
});