import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ResetPassword from '../pages/ResetPassword';
import config from '../config';

jest.mock('../config');

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ResetPassword Integration Tests', () => {
  it('should successfully send reset password request', async () => {
    server.use(
      rest.post(`${config.apiUrl}/auth/reset-password`, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    render(
      <MemoryRouter initialEntries={['/reset-password?token=testtoken']}>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText(/Restablecer Contraseña/i));

    await waitFor(() => {
        expect(screen.queryByText(/Error:/i)).toBeNull();
    });
  });

  it('should handle reset password request failure', async () => {
    server.use(
      rest.post(`${config.apiUrl}/auth/reset-password`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(
      <MemoryRouter initialEntries={['/reset-password?token=testtoken']}>
        <Routes>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText(/Restablecer Contraseña/i));

    await waitFor(() => {
        expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});