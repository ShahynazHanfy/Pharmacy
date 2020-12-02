import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheraSubtheraComponent } from './thera-subthera.component';

describe('TheraSubtheraComponent', () => {
  let component: TheraSubtheraComponent;
  let fixture: ComponentFixture<TheraSubtheraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheraSubtheraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheraSubtheraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
