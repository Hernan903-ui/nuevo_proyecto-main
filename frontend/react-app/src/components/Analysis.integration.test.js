import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analysis from './Analysis';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

jest.mock('../config', () => ({
  apiUrl: 'http://localhost:5000/api',
}));

const mockMostSoldData = [{ id: 1, name: 'Product 1', quantity: 10 }, { id: 2, name: 'Product 2', quantity: 5 }];
const mockMostProfitableData = [{ id: 1, name: 'Product 1', profit: 100 }, { id: 3, name: 'Product 3', profit: 75 }];

const handlers = [
  rest.get('http://localhost:5000/api/most-sold', (req, res, ctx) => {
    return res(ctx.json(mockMostSoldData));
  }),
  rest.get('http://localhost:5000/api/most-profitable', (req, res, ctx) => {
    return res(ctx.json(mockMostProfitableData));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Analysis Integration Tests - Successful API Calls', () => {
  it('fetches and displays most sold products successfully', async () => {
    await act(async () => {
      render(<Analysis />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Product 1: 10/i)).toBeInTheDocument();
      expect(screen.getByText(/Product 2: 5/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays most profitable products successfully', async () => {
    await act(async () => {
      render(<Analysis />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Product 1: 100/i)).toBeInTheDocument();
      expect(screen.getByText(/Product 3: 75/i)).toBeInTheDocument();
    });
  });
});

describe('Analysis Integration Tests - Failed API Calls', () => {
  it('displays an error message when fetching most sold products fails', async () => {
    server.use(
      rest.get('http://localhost:5000/api/most-sold', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );

    await act(async () => {
      render(<Analysis />);
    });

    render(<Analysis />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching most sold products/i)).toBeInTheDocument();
    });
  });
});

it('displays an error message when fetching most profitable products fails', async () => {
  server.use(
    rest.get('http://localhost:5000/api/most-profitable', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
    })
  );

  await act(async () => {
    render(<Analysis />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Error fetching most profitable products/i)).toBeInTheDocument();
  });
});