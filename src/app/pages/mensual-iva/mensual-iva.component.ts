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

  helloWorld() {
    alert('Hello world!');
}
 

  facturasAgr: FacturaAgrupada[] = [];
  totalRegistros: number = 0;
  searchText: any;
  desde: number = 0;

  



  constructor(public _facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturasAgrupadas();
  }

  cargarFacturasAgrupadas() {
    /* this._facturaService.cargarFacturas()
        .subscribe(facturas => this.facturas = facturas); */

    this._facturaService.cargarFacturasAgrupadas()
      .subscribe((resp: any) => {

        this.totalRegistros = resp.total;

        //this.facturasAgr = resp.facturas;

        
        this.facturasAgr = resp.facturas;

        
        //console.log(this.facturasAgr);

      });
  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
    //console.log(desde);
    if(desde>= this.totalRegistros){
      return;
    }
    if(desde<0){
      return;
    }

    this.desde += valor;
    this.cargarFacturasAgrupadas();
  }



}
