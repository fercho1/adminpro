import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;

  

  constructor(public _usuarioService: UsuarioService,
              public router: Router,
              @Inject(DOCUMENT) private _document            
              ) {
                
               }

  ngOnInit(): void {
    //this.usuario = new Usuario('','','');

    this.usuario = this._usuarioService.usuario;
    //console.log(this.usuario);
    
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

  

  

}
