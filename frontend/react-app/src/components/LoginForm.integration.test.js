import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LoginForm from './LoginForm';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock the config file
jest.mock('../config', () => ({
  __esModule: true,
  default: { apiUrl: 'http://localhost:5000/api' },
}));

// Mock the i18n instance
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        "login.email": "Email",
        "login.password": "Password",
        "login.button": "Login",
        "error.default": "An error occurred"
      },
    },
  },
});

const server = setupServer();

describe('LoginForm Integration Tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should successfully log in a user', async () => {
    const mockApiResponse = { token: 'mocked_token' };

    server.use(
      rest.post('http://localhost:5000/api/auth/login', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockApiResponse));
      })
    );

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <LoginForm />
        </I18nextProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/An error occurred/i)).toBeNull();
    });
  });

  it('should display an error message when login fails', async () => {
    server.use(
      rest.post('http://localhost:5000/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ message: 'Unauthorized' })
        );
      })
    );

    const { rerender } = render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <LoginForm />
        </I18nextProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/An error occurred/i)).toBeInTheDocument();
    });
  });
});