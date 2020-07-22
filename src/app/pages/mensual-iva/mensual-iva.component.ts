import { FacturaAgrupada } from './../../models/facturaAgrupada.model';
import { FacturaService } from './../../services/factura/factura.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensual-iva',
  templateUrl: './mensual-iva.component.html',
  styles: [
  ]
})
export class MensualIvaComponent implements OnInit {

  facturasAgr: FacturaAgrupada[] = [];
  totalRegistros: number=0;

  constructor(public _facturaService: FacturaService) { }

  ngOnInit(): void {
    this.cargarFacturasAgrupadas();
  }

  cargarFacturasAgrupadas() {
    /* this._facturaService.cargarFacturas()
        .subscribe(facturas => this.facturas = facturas); */

    this._facturaService.cargarFacturasAgrupadas()
      .subscribe((resp: any) => {

        this.totalRegistros = resp.total;
        this.facturasAgr = resp.facturas;
        console.log(this.facturasAgr);

      });
  }

}
