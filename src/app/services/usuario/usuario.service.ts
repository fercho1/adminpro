import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from './../../config/config';
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  usuario: Usuario;
  token: string;
  menu: any[]=[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    //console.log('Servivio de usuario listo');
    this.cargarStorage();
    this.googleInit();
  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '393210260632-kqcvn0j8676pr4d8voor0jdac4dued0s.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })

  }

  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
                .map((resp:any)=>{
                  this.token = resp.token;

                  localStorage.setItem('token', this.token);
                  //console.log('token renovado');
                  return true;
                })
                .catch(err=>{
                  this.router.navigate(['/login']);
                  //console.log(err.error.mensaje);
                  Swal.fire('No se pudo renovar token','No fue posible renovar token','error');
                  return Observable.throw(err);
                });

  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token })
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        //console.log(resp);
        return true;
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {

    //Boton recuerdame
    if (recordar) {
      localStorage.setItem('email', usuario.email);
      localStorage.setItem('password', usuario.password);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        //console.log(resp);
        return true;
      })
      .catch(err=>{
        //console.log(err.error.mensaje);
        Swal.fire('Error en el login',err.error.mensaje,'error');
        return Observable.throw(err);
      });

  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';



    return this.http.post(url, usuario)
      .map((resp: any) => {
        Swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario
      })
      .catch(err=>{
        //console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.errors.message,'error');
        return Observable.throw(err);
      });

  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .map((resp: any) => {

        if(usuario._id===this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);

        }

        Swal.fire('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
      .catch(err=>{
        //console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.errors.message,'error');
        return Observable.throw(err);
      });

  }

  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp:any) => {
        //console.log(resp);
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imagen actualizada',this.usuario.nombre,'success');

        this.guardarStorage(id,this.token,this.usuario, this.menu);
      })
      .catch(resp => {
        //console.log(resp);
      })

  }

  cargarUsuarios(desde:number=0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
            .map((resp:any)=> resp.usuarios);

  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS + '/usuario/' + id; 
    url += '?token=' + this.token;

    return this.http.delete(url)
            .map(resp=>{
              Swal.fire('Usuario borrado','El usuario a sido eliminado correctamente','success');
              return true;
            });
  }


}
