import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('../config', () => ({
  __esModule: true,
  default: { apiUrl: 'http://localhost:5000/api' },
}));

const mockProducts = [
  { id: 1, name: 'Product 1', cost_price: 10, sale_price: 20, stock: 100 },
  { id: 2, name: 'Product 2', cost_price: 15, sale_price: 25, stock: 50 },
];

const server = setupServer(
  rest.get('http://localhost:5000/api/products', (req, res, ctx) => {
    return res(ctx.json(mockProducts));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe('ProductList Integration Tests', () => {
  it('should fetch and display products', async () => {
    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should display an error message when API call fails', async () => {
    server.use(
      rest.get('http://localhost:5000/api/products', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});