import { ImpuestoRentaService } from './../../services/impuesto-renta/impuesto-renta.service';
import { FacturaAgrupada } from './../../models/facturaAgrupada.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-impuesto-renta',
  templateUrl: './impuesto-renta.component.html',
  styles: [
  ]
})
export class ImpuestoRentaComponent implements OnInit {
  facturasAgr: FacturaAgrupada[] = [];
  totalRegistros: number = 0;
  ingresos: number;
  egresos: number;
  retencion: number;
  nombre: string;
  arreglado: any = [];
  arreglado1: any = [];
  dataExt: any[] = [];
  result: any[] = [];


  totalIng: any;
  totalEg: number;
  totalRet: number;

  constructor(public _impuestoRentaService: ImpuestoRentaService) { }
  ngOnInit(): void {
    this.cargarFacturasAgrupadas();
  }

  cargarFacturasAgrupadas() {
    this._impuestoRentaService.cargarFacturasAgrupadas()
      .subscribe((resp: any) => {
        for (let i = 0; i < resp.length; i++) {
          for (let j = 0; j < resp[i].grupo.length; j++) {
            if (resp[i].grupo[j].tipo === 'VENTA DE BIENES Y/O PRESTACION DE SERVICIOS') {


              let temporal = resp[i].grupo[j].totalbImponible;
              let temporal1 = resp[i].grupo[j].totalretIr;
              resp[i].ingreso = temporal;
              resp[i].retencion = temporal1;
            } else if (resp[i].grupo[j].tipo === 'COMPRAS') {

              let temporal2 = resp[i].grupo[j].totalbImponible + resp[i].grupo[j].totalbImponible0;
              resp[i].egreso = temporal2;
            }
          }
        }
        this.arreglado = resp.map(item => {
          return {
            nombre: item.cliente[0].nombre,
            ruc: item.cliente[0].ruc,
            anio: item._id.anio,
            mes: item._id.mes,
            ingreso: item.ingreso ?? 0,
            egreso: item.egreso ?? 0,
            retencion: item.retencion ?? 0,
          }
        });

        //console.log(this.arreglado);

        function groupBy(array, f) {
          let groups = {};
          array.forEach(function (o) {
            var group = JSON.stringify(f(o));
            groups[group] = groups[group] || [];
            groups[group].push(o);
          });
          return Object.keys(groups).map(function (group) {
            return groups[group];
          })
        }

        this.result = groupBy(this.arreglado, function (item) {
          return [item.nombre, item.anio];
        });

        //console.log(this.result);

        this.totalIng = this.result.map((resp) => {

          let totalIng = 0;
          let totalEg = 0;
          let totalRet = 0;

          for (let i = 0; i < resp.length; i++) {
            totalIng += resp[i].ingreso;
            totalEg += resp[i].egreso;
            totalRet += resp[i].retencion;

          }

          let totales = {"totalIng": totalIng, "totalEg": totalEg, "totalRet": totalRet}

          resp.push(totales)

          //return [{ ...resp, "Ingresos": total } ];
          return resp;
        });

        //console.log(this.totalIng);

      });
  }




}
