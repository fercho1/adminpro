import { FacturaService } from './../../services/factura/factura.service';
import { Factura } from './../../models/factura.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {

  desde: number = 0;

  totalRegistros: number = 0;

  facturas: Factura[] = [];

  constructor(public _facturaService: FacturaService) { }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas() {
    /* this._facturaService.cargarFacturas()
        .subscribe(facturas => this.facturas = facturas); */

    this._facturaService.cargarFacturas(this.desde)
      .subscribe((resp: any) => {

        

        this.totalRegistros = resp.total;
        this.facturas = resp.facturas;
        
        
        

        //console.log(this.facturas);

      });
  }

  buscarFactura(termino: string) {

    if (termino.length <= 0) {
      this.cargarFacturas();
      return;

    }

    this._facturaService.buscarFacturas(termino)
      .subscribe(facturas => this.facturas = facturas);
  }

  borrarFactura(factura: Factura) {
    this._facturaService.borrarFactura(factura._id)
      .subscribe(() => this.cargarFacturas());
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    //console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarFacturas();
  }

}
