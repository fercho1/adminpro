import { Variable } from './../../models/variable.model';
import { VariableService } from './../../services/variable/variable.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../services/cliente/cliente.service';
import { Cliente } from './../../models/cliente.model';
import { NgForm } from '@angular/forms';
import { FacturaService } from './../../services/factura/factura.service';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura.model';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ]
})
export class FacturaComponent implements OnInit {


  clientes: Cliente[] = [];
  variables: Variable[] = [];
  factura: Factura = new Factura('');
  cliente: Cliente = new Cliente('');
  

  constructor(public _facturaService: FacturaService,
    public _clienteService: ClienteService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _variableService: VariableService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarFactura(id);
      }
    });
  }

  ngOnInit(): void {
    this._clienteService.cargarClientes()
      .subscribe(clientes => this.clientes = clientes);

      this._variableService.cargarVariables()
      .subscribe(variables => this.variables = variables);

    this._modalUploadService.notificacion
      .subscribe(resp => {
        //console.log(resp);
        this.factura.img = resp.factura.img;
      });
  }

  cargarFactura(id: string) {
    this._facturaService.cargarFactura(id)
      .subscribe(factura => {

        //console.log(factura);

        this.factura = factura
        this.factura.cliente = factura.cliente._id;
        this.cambioCliente(this.factura.cliente);
      });
  }

  onChanges( newValue: number ) { 
    
    this.factura.bImponible0 = 0; 

    this.factura.bImponible = Math.round(( newValue / this.variables[0].varImponible + Number.EPSILON) * 100) / 100;
    
    this.factura.iva = Math.round(( this.factura.bImponible * this.variables[0].varIva + Number.EPSILON) * 100) / 100;

    this.factura.retIr = Math.round(( this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;
  
  }

  onChanges1( newValue: number ) {    
 

    this.factura.retIr = Math.round(( this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;

    this.factura.retIva = 0;

    this.factura.total2 = Math.round(( this.factura.retIr + this.factura.retIva + Number.EPSILON) * 100) / 100;
  
  }


  

 

  guardarFactura(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);
    if (f.invalid) {
      return;
    }

    

    this._facturaService.guardarFactura(this.factura)
      .subscribe(factura => {
        
        //console.log(factura);

        
        /* this.factura._id = factura._id;
        this.router.navigate(['/factura', factura._id]); */
      })
  }

  cambioCliente(id: string) {
    //console.log(event);
    this._clienteService.obtenerCliente(id)
      .subscribe(cliente => this.cliente = cliente);



  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('facturas', this.factura._id);
  }

}
