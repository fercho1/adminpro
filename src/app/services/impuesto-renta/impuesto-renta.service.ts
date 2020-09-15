import { UsuarioService } from './../usuario/usuario.service';
import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ImpuestoRentaService {



  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService,
              public router: Router) { }

  

  cargarFacturasAgrupadas() {

    let a: any;
    let b: any;
    let c: any;

    let url = URL_SERVICIOS + '/factura/groups';
    return this.http.get(url).pipe(
      map(resp => {
        return resp['facturas'];
      })
    );


  }

  crearCliente(user: User) {

    let url = URL_SERVICIOS + '/user';


    //Creando

    url += '?token=' + this._usuarioService.token;



    return this.http.post(url, user)
      .map((resp: any) => {
        Swal.fire('Datos Cargados', 'Datos', 'success');
        this.router.navigate(['/reportes']);
        return resp.user;
      })
      .catch(err => {
        //console.log(err.error.mensaje);
        Swal.fire('Error al cargar datos ', 'Error', 'error');
        return Observable.throw(err);
      });
  }

}

