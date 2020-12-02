import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPledgeComponent } from './pharmacy-pledge.component';

describe('PharmacyPledgeComponent', () => {
  let component: PharmacyPledgeComponent;
  let fixture: ComponentFixture<PharmacyPledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyPledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacyPledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
