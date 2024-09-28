import '@testing-library/jest-dom';
import {render, screen, within} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import {of} from "rxjs";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwnerComponent} from './residential-owner.component';
import {ResidentialOwner} from "../../interfaces/residentialOwner.interface";

interface residentialOwner {
  getAll?: () => void;
  deleteById?: (id: string) => void;
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
    id: '3',
    tower: '1',
    name: 'Andrea',
    email: 'andrea@gmail.com',
    document: '11253202',
    building: '123'
  },
  {
    id: '2',
    tower: '3',
    name: 'Edison',
    email: 'edison@gmail.com',
    document: '11253201',
    building: '1828'
  }
];

const getDataRows = (): HTMLElement[] => {
  const columnNamesRow = 1;
  return screen.queryAllByRole('row').slice(columnNamesRow);
}

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
      getAll: jest.fn(() => of([...residentialOwnerList]))
    }; // the mock value

    await renderComponent(residentialOwnerServiceMock);

    const rows = getDataRows();

    expect(rows.length).toBe(residentialOwnerList.length);
  });

  it('should render the data correctly', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([...residentialOwnerList]))
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
      getAll: jest.fn(() => of([...residentialOwnerList]))
    }; // the mock value

    const user = userEvent.setup();

    await renderComponent(residentialOwnerServiceMock);

    const filter = screen.getByLabelText(/Filtro/i);

    await user.type(filter, 'ed');

    const rows = getDataRows();
    expect(rows.length).toBe(1);
  });

  it('should not render the table if there is not data', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([]))
    }; // the mock value
    await renderComponent(residentialOwnerServiceMock);

    const filter = screen.queryByLabelText(/Filtro/i);
    const rows = getDataRows();

    expect(rows.length).toBe(0);
    expect(filter).toBeNull();
  });

  it('should not filter by a column that does not exist in the table', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([...residentialOwnerList]))
    }; // the mock value

    const user = userEvent.setup();

    await renderComponent(residentialOwnerServiceMock);

    const filter = screen.getByLabelText(/Filtro/i);

    await user.type(filter, '1828');

    const rows = getDataRows();
    expect(rows.length).toBe(0);
  });

  it('should remove the row from the table when the button delete is pressed and the back return a successful status', async () => {
    const residentialOwnerServiceMock: residentialOwner = {
      getAll: jest.fn(() => of([...residentialOwnerList])),
      deleteById: jest.fn(() => of({status: 200}))
    }; // the mock value

    const user = userEvent.setup();

    await renderComponent(residentialOwnerServiceMock);

    const rows = getDataRows();
    const indexToDelete = 1;
    const targetRow = rows[indexToDelete];
    const buttonDelete = within(targetRow).getByRole('button');

    await user.click(buttonDelete);

    const updatedRows = getDataRows();
    expect(updatedRows.length).toBe(residentialOwnerList.length - 1);
  });
});
