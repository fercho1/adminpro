import { RangoService } from './../../../services/rango/rango.service';
import { Rango } from './../../../models/rango.model';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rango',
  templateUrl: './rango.component.html',
  styles: [
  ]
})
export class RangoComponent implements OnInit {

  rango: Rango = new Rango();

  constructor(

    public _rangoSevice: RangoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarRango(id);
      }
    });
   }

  ngOnInit(): void {
  }

  cargarRango(id: string) {
    this._rangoSevice.obtenerRango(id)
      .subscribe(rango => {

        //console.log(rango);

        this.rango = rango
        
      });
  }

  guardarRango(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);
    if (f.invalid) {
      return;
    }

    this._rangoSevice.crearRango(this.rango)
      .subscribe(rango => {
        
        
      },(err) => {
        Swal.fire('Error al crear rango', '**','error');
      });
  }

}
