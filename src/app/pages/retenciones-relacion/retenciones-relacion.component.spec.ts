import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetencionesRelacionComponent } from './retenciones-relacion.component';

describe('RetencionesRelacionComponent', () => {
  let component: RetencionesRelacionComponent;
  let fixture: ComponentFixture<RetencionesRelacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetencionesRelacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetencionesRelacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
