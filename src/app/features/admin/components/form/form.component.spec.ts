import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

import {FormComponent} from "./form.component";
import {ErrorMessages} from "../../../../shared/constants/error-messages";
import {of} from "rxjs";
import {ResidentialOwnerService} from "../../services/residential-owner.service";

interface residentialOwner {
  getAll?: () => void;
  deleteById?: (id: string) => void;
  save?: (owner: any) => void;
}

const renderComponent = async (mock?: residentialOwner) => {
  return render(FormComponent, {
    providers: [
      {
        provide: ResidentialOwnerService,
        useValue: mock
      }
    ]
  });
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
      await user.type(input, '12345');
      await user.tab();

      expect(screen.queryByText(ErrorMessages.SpecialCharacter)).toBeNull();
    });

    it('should show the message "Este campo no puede contener caracteres especiales" when input has special characters', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Documento/i);
      await user.type(input, 'and-rea');
      await user.tab();

      expect(screen.queryByText(ErrorMessages.SpecialCharacter)).toBeInTheDocument();
    });

    it('should show the message "Este campo es requerido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Documento/i);
      await user.type(input, 'A');
      await user.clear(input);
      await user.tab();

      expect(screen.queryByText(ErrorMessages.Required)).toBeInTheDocument();
    });
  });

  describe('Input Email', () => {
    it('should not show a message if the email is valid', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'testing@hotmail.com');
      await user.tab();

      expect(screen.queryByText(ErrorMessages.NonEmail)).toBeNull();
    });

    it('should show the message "Este campo es requerido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'andre@gmail');
      await user.clear(input);
      await user.tab();

      expect(screen.queryByText(ErrorMessages.Required)).toBeInTheDocument();
    });

    it('should show the message "El campo es inválido, debe ser un email válido" when the input is empty', async () => {
      const user = userEvent.setup();
      await renderComponent();

      const input = screen.getByLabelText(/Email/i);
      await user.type(input, 'andre@gmail');
      await user.tab();

      expect(screen.queryByText(ErrorMessages.NonEmail)).toBeInTheDocument();
    });

    describe('input Tower', () => {
      it('should not show a message when the tower is a valid number', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Torre/i);
        await user.type(input, '12');
        await user.tab();

        expect(screen.queryByText(ErrorMessages.NonNumber)).toBeNull();
      });

      it('should show the message "Este campo es requerido" when the input is empty', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Torre/i);
        await user.type(input, '1');
        await user.clear(input);
        await user.tab();

        expect(screen.queryByText(ErrorMessages.Required)).toBeInTheDocument();
      });
    });

    describe('input Building', () => {
      it('should not show a message when the building is a valid number', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Apartamento/i);
        await user.type(input, '12');
        await user.tab();

        expect(screen.queryByText(ErrorMessages.NonNumber)).toBeNull();
      });

      it('should show the message "Este campo es requerido" when the input is empty', async () => {
        const user = userEvent.setup();
        await renderComponent();

        const input = screen.getByLabelText(/Apartamento/i);
        await user.type(input, '1');
        await user.clear(input);
        await user.tab();

        expect(screen.queryByText(ErrorMessages.Required)).toBeInTheDocument();
      });
    });
  });

  describe('action "Guardar"', () => {
    it('should save the information and show a successful popUp when the button is pressed and the info is correct', async () => {
      const residentialOwnerServiceMock: residentialOwner = {
        save: jest.fn(() => of({}))
      }
      const user = userEvent.setup();
      await renderComponent(residentialOwnerServiceMock);

      const name = screen.getByLabelText(/Nombre/i);
      await user.type(name, 'Andrea');

      const document = screen.getByLabelText(/Documento/i);
      await user.type(document, '1123334321');

      const tower = screen.getByLabelText(/Torre/i);
      await user.type(tower, '2');

      const building = screen.getByLabelText(/Apartamento/i);
      await user.type(building, '32');

      const email = screen.getByLabelText(/Email/i);
      await user.type(email, 'andre@gmail.com');

      const buttonSave = screen.getByRole('button', {name: /Guardar/i});

      await user.click(buttonSave);

      const popUp = screen.getByText('Fue guardado con éxito');

      expect(popUp).toBeInTheDocument();
    });
  });
});
