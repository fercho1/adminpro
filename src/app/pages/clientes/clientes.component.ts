import { Title } from '@angular/platform-browser';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { ClienteService } from './../../services/service.index';
import { Cliente } from './../../models/cliente.model';
import { Component, OnInit } from '@angular/core';



import Swal from 'sweetalert2'

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

  //Falta Crear Cliente
  

  

  actualizarImagen(cliente:Cliente){
    this._modalUploadservice.mostrarModal('clientes',cliente._id);

  }

  /* async abrirSweetAlert(){
    const {value} = await Swal.fire<string>({
      title: 'Crear Cliente',
      text:'Ingrese el nombre del nuevo cliente',
      input: 'text',
      inputPlaceholder: 'Nombre del cliente',
      showCancelButton: true
    })

    if(value.trim().length > 0){
      this._clienteService.crearCliente(value)
        .subscribe((resp:any)=>{
          //console.log(resp);
          this.clientes.push(resp.cliente);
        })
    }
    
    //console.log(valor);
  } */

}
