import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import {of} from "rxjs";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwnerComponent} from './residential-owner.component';
import {ResidentialOwner} from "../../interfaces/residentialOwner.interface";

interface residentialOwner {
  getAll: () => void;
}

const renderComponent = async (mock: residentialOwner) => {
  return render(ResidentialOwnerComponent, {
    providers: [
      {
        provide: ResidentialOwnerService,
        useValue: mock
      }
    ]
  });
}

const residentialOwnerList: ResidentialOwner[] = [
  {
    tower: '1',
    name: 'Andrea',
    email: 'andrea@gmail.com',
    document: '11253202',
    building: '123'
  },
  {
    tower: '3',
    name: 'Edison',
    email: 'edison@gmail.com',
    document: '11253201',
    building: '1'
  }
];

describe('ResidentialOwnerComponent', () => {
  it('should render the component', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([]))
    }; // the mock value

    await renderComponent(residentialOwnerServiceMock);

    expect(screen.getByText('Bienvenidos a residencia')).toBeVisible();
  });

  it('should render the table the number of data that comes from the backend', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of(residentialOwnerList))
    }; // the mock value

    await renderComponent(residentialOwnerServiceMock);

    const rows = screen.getAllByRole('row');

    expect(rows.length).toBe(residentialOwnerList.length + 1);
  });

  it('should render the data correctly', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of(residentialOwnerList))
    }; // the mock value

    await renderComponent(residentialOwnerServiceMock);

    residentialOwnerList.forEach(residentialOwner => {
      expect(screen.getByText(residentialOwner.name)).toBeInTheDocument();
      expect(screen.getByText(residentialOwner.email)).toBeInTheDocument();
      expect(screen.getByText(residentialOwner.document)).toBeInTheDocument();
    })
  });

  it('should show the rows that contain "ed" in the name column', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of(residentialOwnerList))
    }; // the mock value

    const user = userEvent.setup();

    await renderComponent(residentialOwnerServiceMock);

    const filter = screen.getByLabelText(/Filtro/i);

    await user.type(filter, 'ed');

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1 + 1);
  });

  it('should not render the table if there is not data', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([]))
    }; // the mock value
    await renderComponent(residentialOwnerServiceMock);

    const filter = screen.queryByLabelText(/Filtro/i);
    const rows = screen.queryAllByRole('row');

    expect(rows.length).toBe(0);
    expect(filter).toBeNull();
  });
});
