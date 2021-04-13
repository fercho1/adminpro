import { Variable } from './../../models/variable.model';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor(
    public http:HttpClient,
              public _usuarioService: UsuarioService
  ) { }

  cargarVariables(){
    /* let url = URL_SERVICIOS + '/variable'; */
    let url = base_url + '/variable';
    return this.http.get(url)
      .pipe(
        map((resp:any)=> {
          //console.log(resp.variables);
          return resp.variables
        })
      )
              
  }

  actualizarVariable(variable:Variable){
    /* let url = URL_SERVICIOS + '/variable/' + variable._id; */
    let url = base_url + '/variable/' + variable._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, variable)
      .pipe(
        map((resp:any)=> {
          Swal.fire('Variable','Actualizado correctamente','success');
          return resp.variable;
        })
      )
                

  }
}
