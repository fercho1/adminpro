import { TestBed } from '@angular/core/testing';

import { ImpuestoRentaService } from './impuesto-renta.service';

describe('ImpuestoRentaService', () => {
  let service: ImpuestoRentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpuestoRentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
