import { Router } from '@angular/router';

import { Cliente } from './../../models/cliente.model';
import { UsuarioService } from './../usuario/usuario.service';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'


const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  totalClientes: number = 0;

  constructor(public http:HttpClient,
              public _usuarioService: UsuarioService,
              public router: Router) { }

  cargarClientes(desde:number=0){

    /* let url = URL_SERVICIOS + '/cliente/todo'; */
    let url = base_url + '/cliente/todo';
    return this.http.get(url);


    /* let url = URL_SERVICIOS + '/cliente?desde=' + desde;
    return this.http.get(url)
              .map((resp:any)=> {
                this.totalClientes = resp.total;
                return resp.clientes
              }); */
  }

  cargarClientesFac(){

    /* let url = URL_SERVICIOS + '/cliente/todo'; */
    let url = base_url + '/cliente/todo';
    return this.http.get(url)
      .pipe(
        map((resp:any)=> {
          this.totalClientes = resp.total;
          return resp.clientes
        })
      )
              
  }

  obtenerCliente(id:string){
    /* let url = URL_SERVICIOS + '/cliente/'+ id; */
    let url = base_url + '/cliente/'+ id;
    return this.http.get(url)
      .pipe(
        map((resp:any)=> resp.cliente)
      )
            
  }

  borrarCliente(id:string){
    /* let url = URL_SERVICIOS + '/cliente/'+ id; */
    let url = base_url + '/cliente/'+ id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map(resp=>Swal.fire('Cliente Borrado','Eliminado correctamente','success'))
      )
            

  }

  crearCliente(cliente : Cliente){

    /* let url = URL_SERVICIOS + '/cliente'; */
    let url = base_url + '/cliente';

    if(cliente._id){
      //Actualizando
      url += '/'+cliente._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url,cliente)
        .pipe(
          map((resp:any)=>{
            Swal.fire('Cliente actualizado',cliente.nombre, 'success');
            this.router.navigate(['/clientes']);
            return resp.cliente;
          })
        )
                  

    }else{
      //Creando

    url += '?token=' + this._usuarioService.token;

    

    return this.http.post(url,cliente)
      .pipe(
        map((resp:any)=>{
          Swal.fire('Cliente creado',cliente.nombre, 'success');
          this.router.navigate(['/clientes']);
          return resp.cliente;
        })
      )
        
        
      }

  }

  
  /* buscarCliente(termino:string){
    
    let url = base_url + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get(url)
            .map((resp:any)=> resp.clientes);

  } */

  actualizarCliente(cliente:Cliente){
    /* let url = URL_SERVICIOS + '/cliente/' + cliente._id; */
    let url = base_url + '/cliente/' + cliente._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, cliente)
      .pipe(
        map((resp:any)=> {
          Swal.fire('Cliente actualizado',cliente.nombre,'success');
          return resp.cliente;
        })
      )
                

  }


}
