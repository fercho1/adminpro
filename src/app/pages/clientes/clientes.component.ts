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

  desde: number = 0;

  totalRegistros: number=0;

  clientes: Cliente[]=[];

  constructor(public _clienteService: ClienteService,
              public _modalUploadservice: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarClientes();

    this._modalUploadservice.notificacion
      .subscribe(()=> this.cargarClientes());
  }

  /* buscarCliente(termino:string){

    if(termino.length <= 0){
      this.cargarClientes();
      return;
    }

    this._clienteService.buscarCliente(termino)
        .subscribe(clientes => this.clientes = clientes);
  } */

  cargarClientes(){
    /* this._clienteService.cargarClientes(this.desde)
        .subscribe(clientes=> {
          this.clientes=clientes;
          console.log(this.clientes);
        }); */

        this._clienteService.cargarClientes(this.desde)
        .subscribe((resp:any)=>{
          //console.log(resp);
          this.totalRegistros = resp.total;
          this.clientes = resp.clientes;
          //console.log(this.clientes);
          //this.cargando = false;
        });
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
  

  

  /* actualizarImagen(cliente:Cliente){
    this._modalUploadservice.mostrarModal('clientes',cliente._id);

  } */

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
    this.cargarClientes();
  }

}
