import { UsuarioService } from './../../services/service.index';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) { 

    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario){
    //console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;

    }
    

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe(resp =>{

    },(err) => {
      Swal.fire(err.error.mensaje, err.error.errors.message,'error');
    });
  }

  seleccionImagen(archivo:File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    //console.log(archivo);
    if(archivo.type.indexOf('image')<0){
      Swal.fire('Solo imagenes','El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return ;

    } 

    this.imagenSubir = archivo;
    //console.log(archivo);

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result as string;
  
  }
  cambiarImagen(){

    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);

  }

}
