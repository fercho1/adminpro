import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService,
              public router: Router) { }

  ngOnInit(): void {

    this.usuario = this._usuarioService.usuario;
  }

  buscar(termino:string){
    this.router.navigate(['/busqueda',termino]);
  }

}
