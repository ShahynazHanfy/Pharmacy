import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPharmaciesSupADMINComponent } from './all-pharmacies-sup-admin.component';

describe('AllPharmaciesSupADMINComponent', () => {
  let component: AllPharmaciesSupADMINComponent;
  let fixture: ComponentFixture<AllPharmaciesSupADMINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPharmaciesSupADMINComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPharmaciesSupADMINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
