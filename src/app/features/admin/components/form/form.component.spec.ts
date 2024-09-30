import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

import {FormComponent} from "./form.component";

const renderComponent = async () => {
  return render(FormComponent, {});
}
describe('FormComponent', () => {
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
});
