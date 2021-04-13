import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensualIvaComponent } from './mensual-iva.component';

describe('MensualIvaComponent', () => {
  let component: MensualIvaComponent;
  let fixture: ComponentFixture<MensualIvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensualIvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensualIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
