import '@testing-library/jest-dom';
import {render, screen, within} from "@testing-library/angular";
import userEvent from "@testing-library/user-event";

import {of, throwError} from "rxjs";

import {ResidentComponent} from "./resident.component";
import {ResidentService} from "../../services/resident.service";
import {ResidentDisplay} from "../../interfaces/resident.interface";

interface ResidentServiceI {
  getAll?: () => void;
  deleteById?: (id: string) => void;
}

const renderComponent = async (mock: ResidentServiceI) => {
  return render(ResidentComponent, {
    providers: [
      {
        provide: ResidentService,
        useValue: mock
      }
    ]
  });
}

const residentList: ResidentDisplay[] = [{
  document: '1234323124',
  documentType: 'TI',
  password: '2131232131',
  plate: 'OQC34D',
  vehicleType: 'Moto',
  vehicleActive: true,
  name: 'Edison',
  lastname: 'Guirales',
  email: 'eaga@gmail.com',
  phone: '312324546',
  tower: '3',
  apartment: '3',
  role: 'admin',
  qrId: '32kljlkfas',
  isActive: true,
  fullName: 'Edison Guirales'
}];

const getDataRows = (): HTMLElement[] => {
  const columnNamesRow = 1;
  return screen.queryAllByRole('row').slice(columnNamesRow);
}

describe('ResidentComponent', () => {
  it('should render the component', async () => {
    const residentServiceMock = {
      getAll: jest.fn(() => of([]))
    };

    await renderComponent(residentServiceMock);

    expect(screen.getByText('Bienvenidos a residente')).toBeVisible();
  });

  describe('render the data in the table', () => {
    it('should render in the table the number of data that comes from the backend', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList]))
      };

      await renderComponent(residentServiceMock);

      const rows = getDataRows();

      expect(rows.length).toBe(residentList.length);
    });
    it('should render the data correctly', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList]))
      };

      await renderComponent(residentServiceMock);

      residentList.forEach(resident => {
        expect(screen.getByText(resident.fullName)).toBeInTheDocument();
        expect(screen.getByText(resident.email)).toBeInTheDocument();
        expect(screen.getByText(resident.document)).toBeInTheDocument();
        expect(screen.getByText(resident.tower)).toBeInTheDocument();
      });
    });
  });

  describe('filter input', () => {
    it('should filter and show only the rows that contain "ed" in its data', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList]))
      };
      const user = userEvent.setup();

      await renderComponent(residentServiceMock);

      const filter = screen.getByLabelText(/Filtro/i);
      await user.type(filter, 'ed');
      const rows = getDataRows();

      expect(rows.length).toBe(1);
    });
    it('should not show anything in the table when the data does not exist', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList]))
      };
      const user = userEvent.setup();

      await renderComponent(residentServiceMock);

      const filter = screen.getByLabelText(/Filtro/i);
      await user.type(filter, 'andrea');
      const rows = getDataRows();

      expect(rows.length).toBe(0);
    })
  });

  describe('action: Delete', () => {
    it('should remove the row from the table when pressed the button delete and the service return successful', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList])),
        deleteById: jest.fn(() => of({status: 200}))
      };
      const user = userEvent.setup();

      await renderComponent(residentServiceMock);

      const rows = getDataRows();
      const indexToDelete = 0;
      const targetRow = rows[indexToDelete];
      const buttonDelete = within(targetRow).getByRole('button');
      await user.click(buttonDelete);
      const updatedRows = getDataRows();

      expect(updatedRows.length).toBe(residentList.length - 1);
    });
    it('should not remove the row from the table when pressed the button delete and the service return an error', async () => {
      const residentServiceMock = {
        getAll: jest.fn(() => of([...residentList])),
        deleteById: jest.fn(() => throwError(() => 'There was an error'))
      };
      const user = userEvent.setup();

      await renderComponent(residentServiceMock);

      const rows = getDataRows();
      const indexToDelete = 0;
      const targetRow = rows[indexToDelete];
      const buttonDelete = within(targetRow).getByRole('button');
      await user.click(buttonDelete);
      const updatedRows = getDataRows();

      expect(updatedRows.length).toBe(residentList.length);
    })
  });
});

