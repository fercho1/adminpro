import { Usuario } from './../../models/usuario.model';

import { SidebarService, UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  

  constructor(public _sidebar: SidebarService,
              public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    //console.log(this.usuario);
    this.usuario = this._usuarioService.usuario;
    //console.log(this.usuario.imagenUrl);
    this._sidebar.cargarMenu();

    this._modalUploadService.notificacion
        .subscribe(resp=>this._sidebar.cargarMenu());
  }

}
