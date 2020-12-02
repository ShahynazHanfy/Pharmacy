import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDrugComponent } from './show-drug.component';

describe('ShowDrugComponent', () => {
  let component: ShowDrugComponent;
  let fixture: ComponentFixture<ShowDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDrugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
