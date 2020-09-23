import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

import Swal from 'sweetalert2'
import { Reporte } from 'src/app/models/reporte.model';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  totalReportes: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router) { }

  cargarClientesTotales() {

    /* let url = URL_SERVICIOS + '/user/todo'; */
    let url = base_url + '/user/todo';
    return this.http.get(url)
      .pipe(
        map((resp: any) => {

          return resp.users
        })
      )
      
  }

  obtenerClienteT(id: string) {
    /* let url = URL_SERVICIOS + '/user/' + id; */
    let url = base_url + '/user/' + id;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.user)
      )
      
  }







  cargarReportes(desde: number = 0) {



    /* let url = URL_SERVICIOS + '/reporte?desde=' + desde; */
    let url = base_url + '/reporte?desde=' + desde;
    return this.http.get(url);


  }

  cargarReporte(id: string) {
    /* let url = URL_SERVICIOS + '/reporte/' + id; */
    let url = base_url + '/reporte/' + id;
    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          //console.log(resp.reporte);
          return resp.reporte;
        })
      )
      

  }




  borrarReporte(id: string) {
    /* let url = URL_SERVICIOS + '/reporte/' + id; */
    let url = base_url + '/reporte/' + id;

    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map(resp => {
          Swal.fire('Reporte borrada', 'Reporte borrado correctamente', 'success');
          return resp;
        })
      )
      

  }

  guardarReporte(reporte: Reporte) {

    /* let url = URL_SERVICIOS + '/reporte'; */
    let url = base_url + '/reporte';

    if (reporte._id) {
      //Actualizando
      //console.log(reporte._id);
      url += '/' + reporte._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, reporte)
        .pipe(
          map((resp: any) => {

            Swal.fire('Reporte actualizada', 'Actualizado', 'success');
            this.router.navigate(['/reportes']);
            return resp.reporte;
          })
        )
        

    } else {
      //Creando
      //console.log(reporte);


      url += '?token=' + this._usuarioService.token;


      return this.http.post(url, reporte)
        .pipe(
          map((resp: any) => {
            Swal.fire('Reporte creado', 'Creado', 'success');
  
            this.router.navigate(['/reportes']);
            //console.log(resp.reporte);
            return resp.reporte;
          })
        )
        
    }

  }
}
