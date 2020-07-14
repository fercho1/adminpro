import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { ClienteService } from './../../services/service.index';
import { Cliente } from './../../models/cliente.model';
import { Component, OnInit } from '@angular/core';



declare var swal: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]=[];

  constructor(public _clienteService: ClienteService,
              public _modalUploadservice: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarClientes();

    this._modalUploadservice.notificacion
      .subscribe(()=> this.cargarClientes());
  }

  buscarCliente(termino:string){

    if(termino.length <= 0){
      this.cargarClientes();
      return;
    }

    this._clienteService.buscarCliente(termino)
        .subscribe(clientes => this.clientes = clientes);
  }

  cargarClientes(){
    this._clienteService.cargarClientes()
        .subscribe(clientes=> this.clientes=clientes);
  }

  guardarCliente(cliente:Cliente){
    this._clienteService.actualizarCliente(cliente)
        .subscribe();
  }

  borrarCliente(cliente:Cliente){
    this._clienteService.borrarCliente(cliente._id)
          .subscribe(()=> this.cargarClientes());
  }

  crearCliente(){
    swal({
      title: 'Crear cliente',
      text: 'Ingrese el nombre del cliente',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true

    }).then((valor:string)=>{

      if(!valor || valor.length ===0){
        return;
      }

      this._clienteService.crearCliente(valor)
          .subscribe(()=> this.cargarClientes());

    })
  }

  actualizarImagen(cliente:Cliente){
    this._modalUploadservice.mostrarModal('clientes',cliente._id);

  }

}
