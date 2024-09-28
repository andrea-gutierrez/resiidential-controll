import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialOwnerLayoutComponent } from './residential-owner-layout.component';

describe('ResidentialOwnerLayoutComponent', () => {
  let component: ResidentialOwnerLayoutComponent;
  let fixture: ComponentFixture<ResidentialOwnerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialOwnerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialOwnerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
