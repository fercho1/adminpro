import { ConceptoService } from './../../services/concepto/concepto.service';
import { DOCUMENT } from '@angular/common';
import { Variable } from './../../models/variable.model';
import { VariableService } from './../../services/variable/variable.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../services/cliente/cliente.service';
import { Cliente } from './../../models/cliente.model';
import { NgForm } from '@angular/forms';
import { FacturaService } from './../../services/factura/factura.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Factura } from 'src/app/models/factura.model';
import { Concepto } from 'src/app/models/concepto.model';



@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [
  ]
})
export class FacturaComponent implements OnInit {



  mostrarCol: boolean = false;
  mostrarLiq: boolean = false;
  clientes: Cliente[] = [];
  conceptos: Concepto[] = [];
  variables: Variable[] = [];
  factura: Factura = new Factura('');
  cliente: Cliente = new Cliente('');

  is_edit : boolean = false;
  is_edit1 : boolean = false;

  isChecked = false;  
  checkbox = false;

  
  
  


  constructor(public _facturaService: FacturaService,
    public _clienteService: ClienteService,
    public _conceptoService: ConceptoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _variableService: VariableService,
    @Inject(DOCUMENT) private _document
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarFactura(id);
      }
    });
  }

  ngOnInit(): void {

    this.factura.varIva = 0;
      this.factura.varIr = 0;

    this._clienteService.cargarClientesFac()
      .subscribe(clientes => this.clientes = clientes);

    this._conceptoService.cargarConceptoFac()
      .subscribe(conceptos => this.conceptos = conceptos);

    this._variableService.cargarVariables()
      .subscribe(variables => this.variables = variables);

    this._modalUploadService.notificacion
      .subscribe(resp => {
        //console.log(resp);
        this.factura.img = resp.factura.img;
      });

      this.factura.cliente = localStorage.getItem('cliente') || '';
      this.factura.varIr = parseFloat(localStorage.getItem('varIr'));
      this.factura.varIva = parseFloat(localStorage.getItem('varIva'));
     


      


  }

  changed(evt) {
    this.isChecked = evt.target.checked;
    //console.log(this.isChecked);
    if(this.isChecked == true){
      this.mostrarCol = false;
      this.mostrarLiq = false;

      this.factura.cbte = "";
      this.factura.agnt = "";
      this.factura.retIr = 0;
      this.factura.retIva = 0;
      this.factura.total2 = 0;
    } else if (this.isChecked == false) {
      this.mostrarCol = true;
    }
  }
   
 

  cargarFactura(id: string) {
    this._facturaService.cargarFactura(id)
      .subscribe(factura => {

        //console.log(factura);

        switch (factura.tipo) {
          case "VENTA DE BIENES / PRESTACION DE SERVICIOS": {   

            this.is_edit = true;
            
            this.mostrarCol = true;  
            
            this.factura.retIva = 0;

            break;
          }
          default: {            
            this.mostrarCol = false;
            this.is_edit = false;
            break;
          }
        }

        this.factura = factura
        this.factura.cliente = factura.cliente._id;
        this.cambioCliente(this.factura.cliente);
      });
  }

  calculoDatosLiq(newValue: number) {
    //console.log(this.factura.tipo);

     if(this.factura.tipo === 'LIQUIDACION'){
      this.is_edit1 = true;
      this.is_edit = false;

      this.factura.bImponible = Math.round((this.factura.liquidacion * this.variables[0].varLiq + Number.EPSILON) * 100) / 100;
      this.factura.iva = Math.round((this.factura.bImponible * this.variables[0].varIva + Number.EPSILON) * 100) / 100;
      this.factura.total = Math.round((this.factura.bImponible0 + this.factura.bImponible + this.factura.iva + Number.EPSILON) * 100) / 100;
    }
    
    


  }




  calculoDatos(newValue: number) {
    //console.log(this.factura.tipo);
    //console.log(this.isChecked);

    if (this.factura.tipo === 'VENTA DE BIENES / PRESTACION DE SERVICIOS' && this.isChecked == false) {

      this.is_edit = true;

      this.is_edit1 = false;    

      /* this.factura.bImponible = Math.round((newValue / this.variables[0].varImponible + Number.EPSILON) * 100) / 100;
      this.factura.retIr = Math.round((this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;
 */
      this.factura.iva = Math.round((this.factura.bImponible * this.variables[0].varIva + Number.EPSILON) * 100) / 100;
      this.factura.total = Math.round((this.factura.bImponible0 + newValue + this.factura.iva + Number.EPSILON) * 100) / 100;
      this.factura.retIr = Math.round((newValue * this.factura.varIr + Number.EPSILON) * 100) / 100;
      this.factura.retIva = Math.round((this.factura.iva * this.factura.varIva + Number.EPSILON) * 100) / 100;

      this.factura.total2 = Math.round((this.factura.retIva + this.factura.retIr + Number.EPSILON) * 100) / 100;
      
      
    }
    
    else {

      this.is_edit1 = true;
      this.is_edit = false;
      
      
      this.factura.iva = Math.round((this.factura.bImponible * this.variables[0].varIva + Number.EPSILON) * 100) / 100;
      
      this.factura.total = Math.round((this.factura.bImponible0 + this.factura.bImponible + this.factura.iva + Number.EPSILON) * 100) / 100;
    }
    


  }

  /* onChanges1(newValue: number) {


    this.factura.retIr = Math.round((this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;

    this.factura.retIva = 0;


    this.factura.total2 = Math.round((this.factura.retIr + this.factura.retIva + Number.EPSILON) * 100) / 100;

  } */

  /* total2(newValue: number) {    


    this.factura.total2 = Math.round((this.factura.retIr + this.factura.retIva + Number.EPSILON) * 100) / 100;

  } */

  calculoT(newValue: number) {  

    if (this.factura.tipo === 'VENTA DE BIENES / PRESTACION DE SERVICIOS' && this.isChecked == false) {
      this.factura.retIva = 0;
      this.factura.total = Math.round((newValue + this.factura.bImponible + this.factura.iva + Number.EPSILON) * 100) / 100;
      this.factura.retIr = Math.round((newValue * this.factura.varIr + Number.EPSILON) * 100) / 100;
      this.factura.total2 = Math.round(( this.factura.retIr + this.factura.retIva + Number.EPSILON) * 100) / 100;
    }else {
      
      this.factura.total = Math.round((newValue + this.factura.bImponible + this.factura.iva + Number.EPSILON) * 100) / 100;
    }



  }




  calculoFactura(tipo: string) {

    //console.log(tipo);
    //VENTA DE BIENES Y / O PRESTACION DE SERVICIOS

    if(tipo === "VENTA DE BIENES / PRESTACION DE SERVICIOS" && this.isChecked == false){
      this.factura.bImponible0 = 0;
      this.factura.bImponible = 0;
      this.factura.iva = 0;
      this.factura.total = 0;
      //this.factura.bImpRet = 0;
      this.factura.cbte = "";
      this.factura.agnt = "";
      this.factura.retIr = 0;
      this.factura.retIva = 0;
      this.factura.total2 = 0;          

        this.is_edit = true;
        this.is_edit1 = false;
    
        this.mostrarCol = true;

        this.mostrarLiq = false;
    } else if(tipo === "LIQUIDACION"){
      this.mostrarCol = false;
        this.mostrarLiq = true;

        this.is_edit = false;

        this.is_edit1 = true;

        this.factura.bImponible0 = 0;
        this.factura.bImponible = 0;
        this.factura.iva = 0;
        this.factura.liquidacion = 0;
    } else {
      this.mostrarCol = false;

        this.mostrarLiq = false;

        this.is_edit = false;

        this.is_edit1 = true;

        this.factura.bImponible0 = 0;
        this.factura.bImponible = 0;
        this.factura.iva = 0;

        this.factura.total = 0;

    }

  }

  /* onDateBoxContentReady(e)
  {
      
      e.component.option('inputAttr', { readonly: true })
  } */



  /*  onChanges(newValue: number) {
     
     this.factura.bImponible0 = 0;
 
     this.factura.bImponible = Math.round((newValue / this.variables[0].varImponible + Number.EPSILON) * 100) / 100;
 
     this.factura.iva = Math.round((this.factura.bImponible * this.variables[0].varIva + Number.EPSILON) * 100) / 100;
 
     this.factura.retIr = Math.round((this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;
 
   }
 
   onChanges1(newValue: number) {
 
 
     this.factura.retIr = Math.round((this.factura.bImpRet * this.variables[0].varRetIr + Number.EPSILON) * 100) / 100;
 
     this.factura.retIva = 0;
 
     this.factura.total2 = Math.round((this.factura.retIr + this.factura.retIva + Number.EPSILON) * 100) / 100;
 
   } */






  guardarFactura(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);
    if (f.invalid) {
      return;
    }

    //console.log(this.factura);



    this._facturaService.guardarFactura(this.factura)
      .subscribe(factura => {


        
        //console.log(factura.varIr);


        /* this.factura._id = factura._id;
        this.router.navigate(['/factura', factura._id]); */
      })
  }

  cambioCliente(id: string) {
    //console.log(event);
    this._clienteService.obtenerCliente(id)
      .subscribe(cliente => this.cliente = cliente);



  }

  /* cambiarFoto() {
    this._modalUploadService.mostrarModal('facturas', this.factura._id);
  } */



}
