import { RangoService } from './../../../services/rango/rango.service';
import { Rango } from './../../../models/rango.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rangos',
  templateUrl: './rangos.component.html',
  styles: [
  ]
})
export class RangosComponent implements OnInit {

  desde: number = 0;

  totalRegistros: number=0;

  rangos: Rango[]=[];

  constructor(public _rangoService: RangoService) { }

  ngOnInit(): void {
    this.cargarRangos();
  }

  cargarRangos(){
 

        this._rangoService.cargarRangos(this.desde)
        .subscribe((resp:any)=>{
          //console.log(resp);
          this.totalRegistros = resp.total;
          this.rangos = resp.rangos;
          //console.log(this.rangos);
          //this.cargando = false;
        });
  }

  guardarRango(rango:Rango){
    this._rangoService.actualizarRango(rango)
        .subscribe();
  }

  borrarRango(rango:Rango){
    this._rangoService.borrarRango(rango._id)
          .subscribe(()=> this.cargarRangos());
  }

 

}
