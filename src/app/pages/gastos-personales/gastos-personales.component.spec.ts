import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosPersonalesComponent } from './gastos-personales.component';

describe('GastosPersonalesComponent', () => {
  let component: GastosPersonalesComponent;
  let fixture: ComponentFixture<GastosPersonalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosPersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
