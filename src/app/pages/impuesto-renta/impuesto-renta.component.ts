import { ImpuestoRentaService } from './../../services/impuesto-renta/impuesto-renta.service';
import { FacturaAgrupada } from './../../models/facturaAgrupada.model';
import { Component, OnInit } from '@angular/core';


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
  result1: void;


  totalIng: any;
  totalIng1: any;
  totalEg: number;
  totalRet: number;

  constructor(public _impuestoRentaService: ImpuestoRentaService) { }
  ngOnInit(): void {
    this.cargarFacturasAgrupadas();

  }

  cargarDatos() {
    //console.log(this.totalIng1);
    this._impuestoRentaService.crearCliente(this.totalIng1)
      .subscribe(user => {


      })
  }






  cargarFacturasAgrupadas() {
    this._impuestoRentaService.cargarFacturasAgrupadas()
      .subscribe((resp: any) => {

        for (let i = 0; i < resp.length; i++) {
        
          if (resp[i].cliente[0] === undefined) {
            resp[i].cliente[0] = {
              nombre: "",
              cedula:"",
              clave:"",
              ruc:"",
            };
          }
          


          for (let j = 0; j < resp[i].grupo.length; j++) {
            if (resp[i].grupo[j].tipo === 'VENTA DE BIENES / PRESTACION DE SERVICIOS') {


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

        //console.log(resp);


        this.arreglado = resp.map(item => {
          return {
            nombre: item.cliente[0].nombre,
            cedula: item.cliente[0].cedula,
            clave: item.cliente[0].clave,
            ruc: item.cliente[0].ruc,
            anio: item._id.anio,
            mes: item._id.mes,
            ingreso: item.ingreso ?? 0,
            egreso: item.egreso ?? 0,
            retencion: item.retencion ?? 0,
          }
        });

        /* this.arreglado = resp.facturas; */

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

        this.totalIng1 = this.result.map((resp) => {

          let totalIng = 0;
          let totalEg = 0;
          let totalRet = 0;
          let anio = 0;
          let cedula = "";
          let nombre = "";
          let clave = "";
          let ruc = "";

          for (let i = 0; i < resp.length; i++) {
            totalIng += resp[i].ingreso;
            totalEg += resp[i].egreso;
            totalRet += resp[i].retencion;
            cedula = resp[i].cedula;
            nombre = resp[i].nombre;
            ruc = resp[i].ruc;
            clave = resp[i].clave;
            anio = resp[i].anio;

          }

          let totales = { "cedula": cedula, "nombre": nombre, "ruc": ruc, "clave": clave, "anio": anio, "totalIng": totalIng, "totalEg": totalEg, "totalRet": totalRet }



          //return [{ ...resp, "Ingresos": total } ];
          return totales;
        });



        //console.log(this.totalIng1);

        /* this.totalIng = this.result.map((resp) => {

          let totalIng = 0;
          let totalEg = 0;
          let totalRet = 0;
          let anio = 0;
          let nom = "";

          for (let i = 0; i < resp.length; i++) {
            totalIng += resp[i].ingreso;
            totalEg += resp[i].egreso;
            totalRet += resp[i].retencion;
            nom = resp[i].nombre;
            anio = resp[i].anio;

          }

          let totales = {"totalIng": totalIng, "totalEg": totalEg, "totalRet": totalRet}

          resp.push(totales)

          //return [{ ...resp, "Ingresos": total } ];
          return resp;
        }); */

        this.totalRegistros = this.totalIng1.length;

        //console.log(this.totalIng);

      });
  }




}
