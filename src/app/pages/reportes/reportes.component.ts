import { ReporteService } from './../../services/reporte/reporte.service';
import { Reporte } from './../../models/reporte.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styles: [
  ]
})
export class ReportesComponent implements OnInit {

  desde: number = 0;

  totalRegistros: number = 0;

  reportes: Reporte[] = [];

  constructor(public _reporteService: ReporteService) { }

  ngOnInit(): void {
    this.cargarReportes();
  }

  cargarReportes() {
    

    this._reporteService.cargarReportes(this.desde)
      .subscribe((resp: any) => {

        this.totalRegistros = resp.total;
        this.reportes = resp.reportes;
        //console.log(this.reportes);

      });
  }

 

  borrarReporte(reporte: Reporte) {
    //console.log(reporte);
    this._reporteService.borrarReporte(reporte._id)
      .subscribe(() => this.cargarReportes());
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
    this.cargarReportes();
  }

}
