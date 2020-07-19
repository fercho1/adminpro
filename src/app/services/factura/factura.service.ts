import { Router } from '@angular/router';
import { UsuarioService } from './../usuario/usuario.service';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2'
import { Factura } from 'src/app/models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  totalFacturas: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router) { }

  cargarFacturas(desde: number = 0) {



    let url = URL_SERVICIOS + '/factura?desde=' + desde;
    return this.http.get(url);


  }

  cargarFactura(id: string) {
    let url = URL_SERVICIOS + '/factura/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.factura);

  }

  buscarFacturas(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/facturas/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.facturas);

  }


  borrarFactura(id: string) {
    let url = URL_SERVICIOS + '/factura/' + id;

    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        Swal.fire('Factura borrada', 'Factura borrada correctamente', 'success');
        return resp;
      });

  }

  guardarFactura(factura: Factura) {

    let url = URL_SERVICIOS + '/factura';

    if (factura._id) {
      //Actualizando
      url += '/' + factura._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, factura)
        .map((resp: any) => {

          Swal.fire('Factura actualizada', factura.numFactura, 'success');
          this.router.navigate(['/facturas']);
          return resp.factura;
        });

    } else {
      //Creando
      url += '?token=' + this._usuarioService.token;


      return this.http.post(url, factura)
        .map((resp: any) => {
          Swal.fire('Factura creada', factura.numFactura, 'success');

          this.router.navigate(['/facturas']);
          return resp.factura;
        });
    }

  }
}
