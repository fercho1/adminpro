import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';



import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]=[];
  desde: number = 0;

  public usuariosTemp: Usuario[] = [];

  totalRegistros: number=0;
  cargando: boolean=true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
        .subscribe(resp=>this.cargarUsuarios());
  }

  

  cargarUsuarios(){
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe(({ total, usuarios }) =>{
          //console.log(resp);
          this.totalRegistros = total;
          this.usuarios = usuarios;
          this.cargando = false;
          //console.log(this.usuarios);
        });
  }

  cambiarDesde(valor:number){

    let desde = this.desde + valor;
    //console.log(desde);
    if(desde>= this.totalRegistros){
      return;
    }
    if(desde<0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return this.usuarios = this.usuariosTemp;
    }

    this.cargando = true;

    //console.log(termino);
    this._usuarioService.buscarUsuarios(termino)
          .subscribe((usuarios: Usuario[]) =>{
            this.usuarios = usuarios;
            this.cargando = false;
            //console.log(usuarios);
          });

  }

  //Falta borrar usuario
  borrarUsuario(usuario:Usuario){
    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo','error');
      return;
    }

    /* Swal.fire({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }) */
    /* .then(borrar =>{ */
      //console.log(borrar);
      /* if(borrar){ */
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado=>{
              //console.log(borrado);
              this.cargarUsuarios();
            })
      /* } */
    /* }); */
  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
        .subscribe(resp =>{

        },(err) => {
          Swal.fire(err.error.mensaje, err.error.errors.message,'error');
        });
  }

  mostrarModal(usuario: Usuario){
    //console.log(usuario);
    this._modalUploadService.mostrarModal('usuarios',usuario._id, usuario.img);
  }

}
