import { User } from './../../models/user.model';
import { ReporteService } from './../../services/reporte/reporte.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Reporte } from 'src/app/models/reporte.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgForm } from '@angular/forms';

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






  constructor(public _reporteService: ReporteService,
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





  }

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

        this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;

        this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD  + this.reporte.retRendimiento);

      }
      );
  }

  cambio(newValue: number) {
    this.reporte.gPersonales = newValue + this.reporte.salud + this.reporte.alimentacion + this.reporte.vivienda + this.reporte.vestimenta;
    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;
  }

  cambio1(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + newValue + this.reporte.alimentacion + this.reporte.vivienda + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;
  }

  cambio2(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + newValue + this.reporte.vivienda + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;
  }

  cambio3(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + this.reporte.alimentacion + newValue + this.reporte.vestimenta;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;
  }

  cambio4(newValue: number) {
    this.reporte.gPersonales = this.reporte.educacion + this.reporte.salud + this.reporte.alimentacion + this.reporte.vivienda + newValue;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;
  }

  cambio5(newValue: number) {
    this.reporte.iRentaC = newValue + this.reporte.fBasica;

    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD  + this.reporte.retRendimiento);
  }

  cambio6(newValue: number) {
    this.reporte.iRentaC = newValue + this.reporte.fExcedente;

    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + this.reporte.creditoT + this.reporte.retRelacionD  + this.reporte.retRendimiento);
  }

  cambio7(newValue: number) {
    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRendimiento  + this.reporte.creditoT);
  }

  cambio8(newValue: number) {
    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRelacionD  + this.reporte.creditoT);
  }

  cambio9(newValue: number) {
    this.reporte.iRentaFavor = this.reporte.iRentaC - (this.reporte.totalRet + newValue + this.reporte.retRelacionD  + this.reporte.retRendimiento);
  }


  onChanges1(newValue: number) {

    //console.log(newValue);




    this.reporte.actRelDep = newValue - this.reporte.apPersonal;

    this.reporte.subBImponible = this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;

    //console.log(this.reporte.actRelDep);



  }

  onChanges2(newValue: number) {

    //console.log(newValue);




    this.reporte.actRelDep = this.reporte.sueldos - newValue;

    this.reporte.subBImponible = this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;



  }

  onChanges3(newValue: number) {

    //console.log(newValue);






    this.reporte.subBImponible = this.reporte.actEmpresariales + this.reporte.actRelDep + this.reporte.ingRendimientos;

    this.reporte.bimponibleGeneral = this.reporte.subBImponible - this.reporte.gPersonales;



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
