import { User } from './../../models/user.model';
import { ReporteService } from './../../services/reporte/reporte.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Reporte } from 'src/app/models/reporte.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RangoService } from 'src/app/services/service.index';
import { Rango } from 'src/app/models/rango.model';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: [
  ]
})
export class ReporteComponent implements OnInit {

  clientes: User[] = [];
  cliente: User = new User();

  reporte: Reporte = new Reporte();

  mostrar: boolean = false;

  desde: number = 0;

  rangos: Rango[] = [];






  constructor(public _reporteService: ReporteService,
    public _rangoService: RangoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document) {

    this.reporte.actRelDep = 0;
    this.reporte.apPersonal = 0;
    this.reporte.sueldos = 0;
    this.reporte.ingRendimientos = 0;

    this.reporte.gPersonalesPro = 0;
    this.reporte.educacion = 0;
    this.reporte.salud = 0;
    this.reporte.alimentacion = 0;
    this.reporte.vivienda = 0;
    this.reporte.vestimenta = 0;

    this.reporte.gPersonales = 0;
    this.reporte.subBImponible = 0;


    this.reporte.bimponibleGeneral = 0;


    this.reporte.fExcedente = 0;
    this.reporte.fBasica = 0;
    this.reporte.iRentaC = 0;

    this.reporte.totalRet = 0;
    this.reporte.retRelacionD = 0;
    this.reporte.retRendimiento = 0;
    this.reporte.creditoT = 0;
    this.reporte.iRentaFavor = 0;





    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.mostrar = true;
        this.cargarReporte(id);
      }
    });
  }

  ngOnInit(): void {

    this._reporteService.cargarClientesTotales()
      .subscribe(clientes => this.clientes = clientes);


      /* this.cargarRangos(); */


  }

  renta(){
    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
    //console.log(this.reporte.bimponibleGeneral);
    
    
    this._rangoService.cargarRangos(this.desde)
      .subscribe((resp: any) => {
        this.rangos = resp.rangos;
        //console.log(this.rangos);
        this.rangos.forEach(e => {
          //console.log(e);
          if( this.reporte.bimponibleGeneral >  e.fraccionBasica && this.reporte.bimponibleGeneral <=  e.excesoHasta){
            /* console.log(this.reporte.bimponibleGeneral);
            console.log(e.fraccionBasica);
            console.log(e.excesoHasta);
            console.log(e.impFraccionE); */
            this.reporte.fExcedente = Math.round(((this.reporte.bimponibleGeneral - e.fraccionBasica ) * e.impFraccionE + Number.EPSILON) * 100) / 100;

            this.reporte.fBasica = e.impFraccionB;
            
            this.reporte.iRentaC = this.reporte.fExcedente + this.reporte.fBasica;

            this.reporte.iRentaFavor = Math.round(((this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD + this.reporte.retRendimiento))+ Number.EPSILON) * 100) / 100;
          }
        });
      });
  }

  /* cargarRangos() {
    this._rangoService.cargarRangos(this.desde)
      .subscribe((resp: any) => {
        this.rangos = resp.rangos;
        console.log(this.rangos);
      });
  } */

  cambioCliente(id: string) {
    this._reporteService.obtenerClienteT(id)
      .subscribe(cliente => {

        cliente.actEmpresariales = cliente.totalIng - cliente.totalEg;

        cliente.actEmpresariales = parseFloat((cliente.actEmpresariales).toFixed(2));
        cliente._id = null;


        this.reporte.actEmpresariales = cliente.actEmpresariales;


        this.reporte = cliente;
        this.reporte.actRelDep = 0;
        this.reporte.apPersonal = 0;
        this.reporte.sueldos = 0;
        this.reporte.ingRendimientos = 0;
        this.reporte.gPersonalesPro = 0;
        this.reporte.educacion = 0;
        this.reporte.salud = 0;
        this.reporte.alimentacion = 0;
        this.reporte.vivienda = 0;
        this.reporte.vestimenta = 0;
        this.reporte.gPersonales = 0;

        this.reporte.fExcedente = 0;
        this.reporte.fBasica = 0;
        this.reporte.iRentaC = 0;

        this.reporte.retRelacionD = 0;
        this.reporte.retRendimiento = 0;
        this.reporte.creditoT = 0;


        this.reporte.subBImponible = this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos;

        this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;

        this.reporte.iRentaFavor = Math.round(((this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD + this.reporte.retRendimiento)) + Number.EPSILON) * 100) / 100;;

      }
      );
  }

  cambio(newValue: number) {
    this.reporte.gPersonales = newValue + this.reporte.salud + this.reporte.alimentacion + this.reporte.vivienda + this.reporte.vestimenta;
    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
  }

  cambio1(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + newValue + this.reporte.alimentacion + this.reporte.vivienda + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
  }

  cambio2(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + newValue + this.reporte.vivienda + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
  }

  cambio3(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + this.reporte.alimentacion + newValue + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
  }

  cambio4(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + this.reporte.alimentacion + this.reporte.vivienda + newValue;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;
  }

  cambio5(newValue: number) {
    this.reporte.iRentaC = newValue + this.reporte.fBasica;

    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD + this.reporte.retRendimiento);
  }

  cambio6(newValue: number) {
    this.reporte.iRentaC = newValue + this.reporte.fExcedente;

    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD + this.reporte.retRendimiento);
  }

  cambio7(newValue: number) {
    this.reporte.iRentaFavor =  Math.round(((this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRendimiento + this.reporte.creditoT)) + Number.EPSILON) * 100) / 100;
  }

  cambio8(newValue: number) {
    this.reporte.iRentaFavor = Math.round(((this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRelacionD + this.reporte.creditoT))+ Number.EPSILON) * 100) / 100;
  }

  cambio9(newValue: number) {
    this.reporte.iRentaFavor = Math.round(((this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRelacionD + this.reporte.retRendimiento))+ Number.EPSILON) * 100) / 100;
  }


  onChanges1(newValue: number) {

    //console.log(newValue);




    this.reporte.actRelDep = newValue - this.reporte.apPersonal;

    this.reporte.subBImponible = this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;

    //console.log(this.reporte.actRelDep);



  }

  onChanges2(newValue: number) {

    //console.log(newValue);




    this.reporte.actRelDep = this.reporte.sueldos - newValue;

    this.reporte.subBImponible = Math.round((this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos + Number.EPSILON) * 100) / 100;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;



  }

  onChanges3(newValue: number) {

    //console.log(newValue);






    this.reporte.subBImponible = Math.round((this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos + Number.EPSILON) * 100) / 100;

    this.reporte.bimponibleGeneral = Math.round((this.reporte.subBImponible - this.reporte.gPersonales + Number.EPSILON) * 100) / 100;



  }



  cargarReporte(id: string) {
    this._reporteService.cargarReporte(id)
      .subscribe(reporte => {

        //console.log(reporte);

        this.reporte = reporte;


      });
  }

  guardarReporte(f: NgForm) {

    //console.log(f.value);
    if (f.invalid) {
      return;
    }

    //console.log(this.cliente);


    //console.log(this.reporte);

    this._reporteService.guardarReporte(this.reporte)
      .subscribe(reporte => {

        //console.log(reporte);


        /* this.factura._id = factura._id;
        this.router.navigate(['/factura', factura._id]); */
      })
  }



}
