import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../services/cliente/cliente.service';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: [
  ]
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente('');

  constructor(
    public _clienteSevice: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarCliente(id);
      }
    });
   }

  ngOnInit(): void {
  }

  cargarCliente(id: string) {
    this._clienteSevice.obtenerCliente(id)
      .subscribe(cliente => {

        //console.log(cliente);

        this.cliente = cliente
        
      });
  }

  guardarCliente(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);
    if (f.invalid) {
      return;
    }

    this._clienteSevice.crearCliente(this.cliente)
      .subscribe(cliente => {
        //console.log(factura);
        /* this.cliente._id = cliente._id;
        this.router.navigate(['/cliente', cliente._id]); */
        
      })
  }

}
