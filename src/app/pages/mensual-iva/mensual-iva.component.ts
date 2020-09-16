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

  currencyConf: any = { type: 'currency', precision: 2 };





  constructor(public _facturaService: FacturaService) { }

  ngOnInit(): void {
    this.cargarFacturasAgrupadas();
  }

  customizeText(value) {
    
    if(value.valueText == 1){      
      return "Enero";
    } else if(value.valueText == 2){      
      return "Febrero";
    } else if(value.valueText == 3){      
      return "Marzo";
    } else if(value.valueText == 4){      
      return "Abril";
    } else if(value.valueText == 5){      
      return "Mayo";
    } else if(value.valueText == 6){      
      return "Junio";
    } else if(value.valueText == 7){      
      return "Julio";
    } else if(value.valueText == 8){      
      return "Agosto";
    } else if(value.valueText == 9){      
      return "Septiembre";
    } else if(value.valueText == 10){      
      return "Octubre";
    } else if(value.valueText == 11){      
      return "Noviembre";
    } else if(value.valueText == 12){      
      return "Diciembre";
    }
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
    this.cargarFacturasAgrupadas();
  }



}
