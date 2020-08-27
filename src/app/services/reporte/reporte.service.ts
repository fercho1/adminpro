import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

import Swal from 'sweetalert2'
import { Reporte } from 'src/app/models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  totalReportes: number = 0;

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router) { }

    cargarClientesTotales(){

      let url = URL_SERVICIOS + '/user/todo';
      return this.http.get(url)
                .map((resp:any)=> {
                  
                  return resp.users
                });
    }

    obtenerClienteT(id:string){
      let url = URL_SERVICIOS + '/user/'+ id;
      return this.http.get(url)
              .map((resp:any)=> resp.user);
    }







    cargarReportes(desde: number = 0) {



      let url = URL_SERVICIOS + '/reporte?desde=' + desde;
      return this.http.get(url);
  
  
    }
  
    cargarReporte(id: string) {
      let url = URL_SERVICIOS + '/reporte/' + id;
      return this.http.get(url)
        .map((resp: any) => resp.reporte);
  
    }
  
    
  
  
    borrarReporte(id: string) {
      let url = URL_SERVICIOS + '/reporte/' + id;
  
      url += '?token=' + this._usuarioService.token;
  
      return this.http.delete(url)
        .map(resp => {
          Swal.fire('Reporte borrada', 'Reporte borrado correctamente', 'success');
          return resp;
        });
  
    }
  
    guardarReporte(reporte: Reporte) {
  
      let url = URL_SERVICIOS + '/reporte';
  
      if (reporte._id) {
        //Actualizando
        url += '/' + reporte._id;
        url += '?token=' + this._usuarioService.token;
        return this.http.put(url, reporte)
          .map((resp: any) => {
  
            Swal.fire('Reporte actualizada', 'Actualizado', 'success');
            this.router.navigate(['/reportes']);
            return resp.reporte;
          });
  
      } else {
        //Creando
        url += '?token=' + this._usuarioService.token;
  
  
        return this.http.post(url, reporte)
          .map((resp: any) => {
            Swal.fire('Reporte creado', 'Creado', 'success');
  
            this.router.navigate(['/reportes']);
            return resp.reporte;
          });
      }
  
    }
}
