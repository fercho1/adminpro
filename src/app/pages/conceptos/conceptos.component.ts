import { Concepto } from './../../models/concepto.model';
import { ConceptoService } from './../../services/concepto/concepto.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent implements OnInit {

  conceptos: Concepto[]=[];

  concepto: Concepto = new Concepto('');

  conc: Concepto = new Concepto('');
  ipAddress: string;
  totalRegistros: number=0;

  desde: number = 0;

  cargando: boolean=true;

  public conceptosTemp: Concepto[] = [];

  


  constructor(
    public _conceptoService: ConceptoService
  ) { }

  ngOnInit(): void {
    this.cargarConceptos();
    
  }

  /* cargarConceptos(){
    this.cargando = true;
    this._conceptoService.cargarConceptos()
        .subscribe((conceptos:any)=>{
          this.totalRegistros = conceptos.total;
          this.conc=conceptos;
          this.cargando = false;
        }
        );

        
  } */
  cargarConceptos(){
    this.cargando = true;

    this._conceptoService.cargarConceptos(this.desde)
        .subscribe(({ total, conceptos }) =>{
          //console.log(resp);
          this.totalRegistros = total;
          this.conceptos = conceptos;
          this.cargando = false;
          //console.log(this.usuarios);
        });
  }


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
    this.cargarConceptos();
  }

  buscarConcepto(termino:string){

    if(termino.length <= 0){
      this.cargarConceptos();
      return this.conceptos = this.conceptosTemp;
    }

    this.cargando = true;

    //console.log(termino);
    this._conceptoService.buscarConceptos(termino)
          .subscribe((conceptos: Concepto[]) =>{
            this.conceptos = conceptos;
            this.cargando = false;
            //console.log(usuarios);
          });

  }

  async nuevo() {
    const ipAPI = '//api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
      .then(response => response.json())
      .then(data => data.ip)

    const  ipAddress  = await Swal.fire({
      title: 'Ingresa nombre del nuevo concepto',
      input: 'text',
      inputLabel: 'Concepto',
      inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Necesitas escribir algo!'
        }
      }
    }as any)

    
    //console.log(ipAddress.value);
    
    this.concepto.nombre = (ipAddress.value).toString().toUpperCase();

//console.log(this.conc);
    if (ipAddress) {
      

      this._conceptoService.crearConceptos(this.concepto)
      .subscribe(concepto => {
        //console.log(concepto);
        this.cargarConceptos();
        
      },(err) => {
        Swal.fire('Error al crear concepto', 'Ya existe un concepto con mismo nombre','error');
      });
    }

  }

  guardarConcepto(concepto: Concepto){
    this._conceptoService.actualizarConcepto(concepto)
        .subscribe(resp =>{

        },(err) => {
          Swal.fire(err.error.mensaje, err.error.errors.message,'error');
        });
  }

  borrarConcepto(concepto:Concepto){
    
        this._conceptoService.borrarConcepto(concepto._id)
            .subscribe(borrado=>{
              //console.log(borrado);
              this.cargarConceptos();
            })
     
  }

  

}
