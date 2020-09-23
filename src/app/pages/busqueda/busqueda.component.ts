import { environment } from './../../../environments/environment';
import { Factura } from './../../models/factura.model';
import { URL_SERVICIOS } from './../../config/config';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { Cliente } from 'src/app/models/cliente.model';


const base_url = environment.base_url;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  facturas: Factura[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];
        //console.log(termino);
        this.buscar(termino);
      });
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    /* let url = URL_SERVICIOS + '/busqueda/todo/' + termino; */
    let url = base_url + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe((resp:any) => {
        //console.log(resp);
        this.usuarios = resp.usuarios;
        this.clientes = resp.clientes;
        this.facturas = resp.facturas;
      })
  }

}
