import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";

import {of} from "rxjs";

import {ResidentialOwnerService} from "../../services/residential-owner.service";
import {ResidentialOwnerComponent} from './residential-owner.component';

describe('ResidentialOwnerComponent', () => {
  let component: ResidentialOwnerComponent;
  let fixture: ComponentFixture<ResidentialOwnerComponent>;

  const residentialOwnerServiceMock = {
    getAll: jest.fn()
  }; // the mock value

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialOwnerComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ResidentialOwnerService,
          useValue: residentialOwnerServiceMock
        },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResidentialOwnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    residentialOwnerServiceMock.getAll.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load the residential owner list', () => {
    residentialOwnerServiceMock.getAll.mockImplementation(() => of([{
      name: 'testing'
    }]));

    fixture.detectChanges();

    expect(residentialOwnerServiceMock.getAll).toHaveBeenCalled();
    expect(component.residentialOwnerList.length).toBeGreaterThan(0);
  });
});
