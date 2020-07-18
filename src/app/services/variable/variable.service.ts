import { Variable } from './../../models/variable.model';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor(
    public http:HttpClient,
              public _usuarioService: UsuarioService
  ) { }

  cargarVariables(){
    let url = URL_SERVICIOS + '/variable';
    return this.http.get(url)
              .map((resp:any)=> {
                
                return resp.variables
              });
  }

  actualizarVariable(variable:Variable){
    let url = URL_SERVICIOS + '/variable/' + variable._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, variable)
                .map((resp:any)=> {
                  Swal.fire('Variable','Actualizado correctamente','success');
                  return resp.variable;
                });

  }
}
