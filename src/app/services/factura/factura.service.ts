import { Router } from '@angular/router';
import { UsuarioService } from './../usuario/usuario.service';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2'
import { Factura } from 'src/app/models/factura.model';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  totalFacturas: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router) { }

  cargarFacturasAgrupadas() {



    /* let url = URL_SERVICIOS + '/factura/group1'; */
    let url = base_url + '/factura/group1';
    return this.http.get(url);


  }

  cargarFacturas(desde: number = 0) {



    /* let url = URL_SERVICIOS + '/factura/todo'; */
    let url = base_url + '/factura/todo';
    return this.http.get(url);


  }

  cargarFactura(id: string) {
    /* let url = URL_SERVICIOS + '/factura/' + id; */
    let url = base_url + '/factura/' + id;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.factura)
      )
      

  }

  buscarFacturas(termino: string) {
    /* let url = URL_SERVICIOS + '/busqueda/coleccion/facturas/' + termino; */
    let url = base_url + '/busqueda/coleccion/facturas/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.facturas)
      )
      

  }


  borrarFactura(id: string) {
    /* let url = URL_SERVICIOS + '/factura/' + id; */
    let url = base_url + '/factura/' + id;

    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map(resp => {
          Swal.fire('Factura borrada', 'Factura borrada correctamente', 'success');
          return resp;
        })
      )
      

  }

  guardarStorage(cliente: string) {
    
    localStorage.setItem('cliente', cliente);

    //console.log(cliente);
   

    //this.cliente = cliente;    

  }

  guardarFactura(factura: Factura) {

    /* let url = URL_SERVICIOS + '/factura'; */
    let url = base_url + '/factura';

    if (factura._id) {
      //Actualizando
      url += '/' + factura._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, factura)
        .pipe(
          map((resp: any) => {
            
            
            //Swal.fire('Factura actualizada', factura.numFactura, 'success');
            this.router.navigate(['/facturas']);
            return resp.factura;
          })
        )
        

    } else {
      //Creando
      url += '?token=' + this._usuarioService.token;


      return this.http.post(url, factura)
        .pipe(
          map((resp: any) => {
            //Swal.fire('Factura creada', factura.numFactura, 'success');
            //console.log(resp.factura.cliente);
            this.guardarStorage(resp.factura.cliente);
            this.router.navigate(['/facturas']);
            return resp.factura;
          })
        )
        
    }

  }
}
