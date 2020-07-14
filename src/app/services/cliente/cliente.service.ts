import { Cliente } from './../../models/cliente.model';
import { UsuarioService } from './../usuario/usuario.service';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  totalClientes: number = 0;

  constructor(public http:HttpClient,
              public _usuarioService: UsuarioService) { }

  cargarClientes(){
    let url = URL_SERVICIOS + '/cliente';
    return this.http.get(url)
              .map((resp:any)=> {
                this.totalClientes = resp.total;
                return resp.clientes
              });
  }

  obtenerCliente(id:string){
    let url = URL_SERVICIOS + '/cliente/'+ id;
    return this.http.get(url)
            .map((resp:any)=> resp.cliente);
  }

  borrarCliente(id:string){
    let url = URL_SERVICIOS + '/cliente/'+ id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .map(resp=>swal('Cliente Borrado','Eliminado correctamente','success'));

  }

  crearCliente(nombre: string){

    let url = URL_SERVICIOS + '/cliente';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre:nombre})
            .map((resp:any)=> resp.cliente);

  }

  buscarCliente(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get(url)
            .map((resp:any)=> resp.clientes);

  }

  actualizarCliente(cliente:Cliente){
    let url = URL_SERVICIOS + '/cliente/' + cliente._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, cliente)
                .map((resp:any)=> {
                  swal('Cliente actualizado',cliente.nombre,'success');
                  return resp.cliente;
                });

  }


}
