import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestralIvaComponent } from './semestral-iva.component';

describe('SemestralIvaComponent', () => {
  let component: SemestralIvaComponent;
  let fixture: ComponentFixture<SemestralIvaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemestralIvaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestralIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
