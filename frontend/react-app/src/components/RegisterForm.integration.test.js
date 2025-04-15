import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import RegisterForm from './RegisterForm';
import config from '../config';

jest.mock('../config');

const server = setupServer(
  rest.post(`${config.apiUrl}/auth/register`, (req, res, ctx) => {
    const { name, email, password, business_name } = req.body;
    if (email === 'test@example.com') {
      return res(ctx.json({ message: 'User registered successfully' }));
    } else {
        return res(ctx.status(400), ctx.json({ error: 'User already exists' }));
      }
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RegisterForm Integration Tests', () => {
  it('should successfully register a new user', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });

    fireEvent.click(screen.getByText(/Registrar/i));

    await waitFor(() => {
      expect(screen.getByText(/Usuario registrado exitosamente/i)).toBeInTheDocument();
    });
  });

  it('should display an error if the user already exists', async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'existing@example.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });

    fireEvent.click(screen.getByText(/Registrar/i));

    await waitFor(() => {
        expect(screen.getByText(/Usuario ya existe/i)).toBeInTheDocument();
    });
  });
  
    it('should display an error message if the API returns a 500 error', async () => {
        server.use(
            rest.post(`${config.apiUrl}/auth/register`, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json({ error: 'Internal server error' }));
            })
        );
    
        render(<RegisterForm />);
    
        fireEvent.change(screen.getByLabelText(/Nombre:/i), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByLabelText(/Correo Electrónico:/i), { target: { value: 'newuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/Contraseña:/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Nombre del Negocio:/i), { target: { value: 'Test Business' } });
    
        fireEvent.click(screen.getByText(/Registrar/i));
    
        await waitFor(() => {
            expect(screen.getByText(/Ocurrió un error/i)).toBeInTheDocument();
        });
    });
});