import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

import {FormComponent} from "./form.component";

const renderComponent = async () => {
  return render(FormComponent, {});
}
describe('Residential owner FormComponent', () => {
  it('should render the component', async () => {
    await renderComponent();

    expect(screen.getByText('Crear Propietario')).toBeVisible();
  });

  describe('Input Nombre', () => {
    it('should not show a message if the name has only letters', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Nombre/i);
      await user.type(input, 'Andrea');

      expect(screen.queryByText('El item es inválido')).toBeNull();
    });

    it('should show the message "Este campo solo puede contener letras" when input has special characters', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Nombre/i);
      await user.type(input, 'andrea3');
      await user.tab();

      expect(screen.queryByText('Este campo solo puede contener letras')).toBeInTheDocument();
    });

    it('should show the message "Este campo es requerido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Nombre/i);
      await user.type(input, 'A');
      await user.clear(input);
      await user.tab();

      expect(screen.queryByText('Este campo es requerido')).toBeInTheDocument();
    });
  });

  describe('Input Document', () => {
    it('should not show a message if the document is valid', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Documento/i);
      await user.type(input, '32313');
      await user.tab();

      expect(screen.queryByText('El campo no puede contener caracteres especiales')).toBeNull();
    });

    it('should show the message "Este campo no puede contener caracteres especiales" when input has special characters', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Documento/i);
      await user.type(input, 'and-rea');
      await user.tab();

      expect(screen.queryByText('Este campo no puede contener caracteres especiales')).toBeInTheDocument();
    });

    it('should show the message "Este campo es requerido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Documento/i);
      await user.type(input, 'A');
      await user.clear(input);
      await user.tab();

      expect(screen.queryByText('Este campo es requerido')).toBeInTheDocument();
    });
  });

  describe('Input Email', () => {
    it('should not show a message if the email is valid', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'testing@hotmail.com');
      await user.tab();

      expect(screen.queryByText('El campo no es un email válido')).toBeNull();
    });

    it('should show the message "Este campo es requerido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'andre@gmail');
      await user.clear(input);
      await user.tab();

      expect(screen.queryByText('Este campo es requerido')).toBeInTheDocument();
    });

    it('should show the message "El campo es inválido, debe ser un email válido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'andre@gmail');
      await user.tab();

      expect(screen.queryByText('El campo es inválido, debe ser un email válido')).toBeInTheDocument();
    });

    describe('input Tower', () => {
      it('should not show a message when the tower is a valid number', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Torre/i);
        await user.type(input, '12');
        await user.tab();

        expect(screen.queryByText('El campo solo puede contener números')).toBeNull();
      });

      it('should show the message "Este campo es requerido" when the input is empty', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Torre/i);
        await user.type(input, '1');
        await user.clear(input);
        await user.tab();

        expect(screen.queryByText('Este campo es requerido')).toBeInTheDocument();
      });
    });

    describe('input Building', () => {
      it('should not show a message when the building is a valid number', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Apartamento/i);
        await user.type(input, '12');
        await user.tab();

        expect(screen.queryByText('El campo solo puede contener números')).toBeNull();
      });

      it('should show the message "Este campo es requerido" when the input is empty', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Apartamento/i);
        await user.type(input, '1');
        await user.clear(input);
        await user.tab();

        expect(screen.queryByText('Este campo es requerido')).toBeInTheDocument();
      });
    });
  });

  describe('action "Guardar"', () => {
    it('should save the information when the button is pressed', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const buttonSave = screen.getByRole('button', {name: /Guardar/i});

      await user.click(buttonSave);

      expect(false).toBeTruthy();
    });
  });
});
