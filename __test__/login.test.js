import {render, screen} from "@testing-library/react";
import { Login } from '../components/Login';

it('Debe tener los labels Username y Password, asi como el boton submit', () => {
    render(<Login />)

    const usernameField = screen.getByLabelText(/Username/i);
    const passwordField = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByText(/submit/i);

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
})