import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import Reports from './Reports';
import config from '../config';

jest.mock('../config');

const mockMostSold = [
  { id: 1, name: 'Product 1', quantity: 10 },
  { id: 2, name: 'Product 2', quantity: 5 },
];

const mockMostProfitable = [
  { id: 3, name: 'Product 3', profit: 100 },
  { id: 4, name: 'Product 4', profit: 50 },
];

const server = setupServer(
  rest.get(`${config.apiUrl}/reports/most-sold`, (req, res, ctx) => {
    return res(ctx.json(mockMostSold));
  }),
  rest.get(`${config.apiUrl}/reports/most-profitable`, (req, res, ctx) => {
      return res(ctx.json(mockMostProfitable));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Reports Integration Tests', () => {
  it('should fetch most sold products successfully', async () => {
    render(<Reports />);
    const product1 = await screen.findByText('Product 1');
    const product2 = await screen.findByText('Product 2');
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  it('should fetch most profitable products successfully', async () => {
      render(<Reports />);
      const product3 = await screen.findByText('Product 3');
      const product4 = await screen.findByText('Product 4');
      expect(product3).toBeInTheDocument();
      expect(product4).toBeInTheDocument();
  });

  it('should handle error when fetching most sold products fails', async () => {
    server.use(
      rest.get(`${config.apiUrl}/reports/most-sold`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Failed to fetch' }));
      })
    );

    render(<Reports />);
    await waitFor(() => {
      expect(screen.getByText(/Error fetching most sold products/i)).toBeInTheDocument();
    });
  });

  it('should handle error when fetching most profitable products fails', async () => {
    server.use(
      rest.get(`${config.apiUrl}/reports/most-profitable`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Failed to fetch' }));
      })
    );

    render(<Reports />);
    await waitFor(() => {
        expect(screen.getByText(/Error fetching most profitable products/i)).toBeInTheDocument();
    });
  });
});