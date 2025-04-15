import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockList from './StockList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('../config', () => ({ apiUrl: 'http://localhost:5000/api' }));
const config = require('../config');

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('StockList Integration Tests', () => {
  it('should fetch and display low stock products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', stock: 5 },
      { id: 2, name: 'Product 2', stock: 2 },
    ];

    server.use(
      rest.get(`${config.apiUrl}/low-stock`, (req, res, ctx) => {
        return res(ctx.json(mockProducts));
      })
    );

    render(<StockList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should display an error message when fetching low stock products fails', async () => {
    server.use(
      rest.get(`${config.apiUrl}/low-stock`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<StockList />);

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });
});