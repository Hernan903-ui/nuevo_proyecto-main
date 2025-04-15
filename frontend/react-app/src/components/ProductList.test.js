import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '../ProductList';

// Mock the config file
jest.mock('../../config', () => ({
  apiUrl: 'http://localhost:5000/api', // Replace with your test API URL
}));

// Mock the fetch function
global.fetch = jest.fn();

describe('ProductList', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches and displays products successfully', async () => {
    // Mock successful API response
    const mockProducts = [
      { id: 1, name: 'Product 1', cost_price: 10, sale_price: 20, stock: 100 },
      { id: 2, name: 'Product 2', cost_price: 15, sale_price: 25, stock: 50 },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductList />);

    // Wait for the products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${config.apiUrl}/products`);
  });

  it('displays an error message when fetching products fails', async () => {
    // Mock failed API response
    fetch.mockRejectedValueOnce(new Error('Failed to fetch products'));

    render(<ProductList />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText('Error fetching products. Please try again.')).toBeInTheDocument();
    });

    // Check if fetch was called with the correct URL (using mocked config)
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/products');
  });
});