import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Pos from './Pos';
import config from '../config';

jest.mock('../config');

describe('Pos Integration Tests', () => {
  let server;
  const mockApiUrl = 'http://localhost:5000/api';

  beforeAll(() => {
    config.apiUrl = mockApiUrl;
    server = setupServer();
    server.listen();
  });

  beforeEach(() => {
    config.apiUrl = mockApiUrl;
  });

  afterEach(() => {
    jest.clearAllMocks();
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should handle successful sale', async () => {
    const mockResponse = { message: 'Sale finalized successfully' };

    server.use(
      rest.post(`${mockApiUrl}/sales`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockResponse));
      })
    );

    render(<Pos />);

    await waitFor(() =>
      expect(screen.queryByText(/Error finalizing sale/i)).not.toBeInTheDocument()
    );
  });

  it('should handle failed sale', async () => {
    const mockErrorResponse = { message: 'Failed to finalize sale' };

    server.use(
      rest.post(`${mockApiUrl}/sales`, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(mockErrorResponse));
      })
    );

    render(<Pos />);

    await waitFor(() =>
      expect(screen.getByText(/Error finalizing sale/i)).toBeInTheDocument()
    )
  }, 10000);

  it('should handle network error', async () => {
    server.use(
      rest.post(`${mockApiUrl}/sales`, (req, res, ctx) => {
        return res.networkError('Failed to connect');
      })
    );

    render(<Pos />);
    await waitFor(() =>
      expect(screen.getByText(/Error finalizing sale/i)).toBeInTheDocument()
    );
  });
});