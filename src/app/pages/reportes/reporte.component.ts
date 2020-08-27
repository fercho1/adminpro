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
  

  constructor(public _reporteService: ReporteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private _document) {
      activatedRoute.params.subscribe(params => {
        let id = params['id'];
  
        if (id !== 'nuevo') {
          this.cargarReporte(id);
        }
      });
     }

  ngOnInit(): void {
    this._reporteService.cargarClientesTotales()
      .subscribe(clientes => this.clientes = clientes);

  }

  cambioCliente(id: string) {
    //console.log(event);
    this._reporteService.obtenerClienteT(id)
      .subscribe(cliente => this.cliente = cliente);
  }

  cargarReporte(id: string) {
    this._reporteService.cargarReporte(id)
      .subscribe(reporte => {

        //console.log(reporte);

        this.reporte = reporte
        this.reporte.cliente = reporte.cliente._id;
        this.cambioCliente(this.reporte.cliente);
      });
  }

  guardarReporte(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);
    if (f.invalid) {
      return;
    }



    this._reporteService.guardarReporte(this.reporte)
      .subscribe(reporte => {

        //console.log(factura);


        /* this.factura._id = factura._id;
        this.router.navigate(['/factura', factura._id]); */
      })
  }

  

}
