import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestoRentaComponent } from './impuesto-renta.component';

describe('ImpuestoRentaComponent', () => {
  let component: ImpuestoRentaComponent;
  let fixture: ComponentFixture<ImpuestoRentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpuestoRentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpuestoRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
