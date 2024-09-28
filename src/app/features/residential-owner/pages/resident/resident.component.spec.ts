import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/angular";

import {of} from "rxjs";

import {ResidentComponent} from "./resident.component";
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../interfaces/resident.interface";

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

interface ResidentI extends Resident {
  fullName: string;
}

const residentList: ResidentI[] = [{
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
  roles: ['admin'],
  qrId: '32kljlkfas',
  isActive: true,
  fullName: 'Edison Guirales'
}];

const getDataRows = (): HTMLElement[] => {
  const columnNamesRow = 1;
  return screen.queryAllByRole('row').slice(columnNamesRow);
}

describe('ResidentComponent', () => {
  let residentServiceMock: ResidentServiceI;
  beforeEach(async () => {
    residentServiceMock = {
      getAll: jest.fn(() => of([...residentList]))
    };

    await renderComponent(residentServiceMock);
  });

  it('should render the component', async () => {
    expect(screen.getByText('Bienvenidos a residente')).toBeVisible();
  });

  it('should render in the table the number of data that comes from the backend', async () => {
    const rows = getDataRows();

    expect(rows.length).toBe(residentList.length);
  });

  it('should render the data correctly', async () => {
    residentList.forEach(resident => {
      expect(screen.getByText(resident.fullName)).toBeInTheDocument();
      expect(screen.getByText(resident.email)).toBeInTheDocument();
      expect(screen.getByText(resident.document)).toBeInTheDocument();
    })
  });
});
