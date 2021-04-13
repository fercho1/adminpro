import { CargarConcepto } from './../../interfaces/cargar-conceptos.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Concepto } from './../../models/concepto.model';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import {map} from 'rxjs/operators'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  constructor(
    public _usuarioService: UsuarioService,
    public http:HttpClient,
    public router: Router
  ) { }

 /*  cargarConceptos(){
    
    let url = base_url + '/concepto';
    return this.http.get(url)
      .pipe(
        map((resp:any)=> {
          
          return resp.conceptos;
        })
      )
              
  }
 */
cargarConceptoFac(){

  /* let url = URL_SERVICIOS + '/cliente/todo'; */
  let url = base_url + '/concepto/todo';
  return this.http.get(url)
    .pipe(
      map((resp:any)=> {
        
        return resp.conceptos
      })
    )
            
}
  cargarConceptos(desde:number=0){
    /* let url = URL_SERVICIOS + '/usuario?desde=' + desde; */
    let url = base_url + '/concepto?desde=' + desde;
    return this.http.get<CargarConcepto>(url)
    .pipe(
      map( resp => {
        const conceptos = resp.conceptos.map( 
          user => new Concepto(user.nombre,user._id)  
        );
        //console.log(conceptos);
        return {
          total: resp.total,
          conceptos
        };
      })
    )
  }

  crearConceptos(concepto : Concepto){

    //console.log(concepto);

    /* let url = URL_SERVICIOS + '/cliente'; */
    let url = base_url + '/concepto';

    
      //Creando

    url += '?token=' + this._usuarioService.token;

    //console.log(concepto);

    return this.http.post(url, concepto)
      .pipe(
        map((resp:any)=>{
          Swal.fire('concepto creado','Creado', 'success');
          this.router.navigate(['/conceptos']);
          return resp.concepto;
        })
      )
        
        
      

  }

  actualizarConcepto(concepto: Concepto) {

    let url = base_url + '/concepto/' + concepto._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, concepto)
      .pipe(
        map((resp:any)=> {
          Swal.fire('Concepto','Actualizado correctamente','success');
          return resp.concepto;
        })
      )
      
      

  }

  borrarConcepto(id:string){
    /* let url = URL_SERVICIOS + '/usuario/' + id;  */
    let url = base_url + '/concepto/' + id; 
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(

        map(resp=>{
          Swal.fire('Concepto borrado','El concepto a sido eliminado correctamente','success');
          return true;
        })
      )
            
  }

  buscarConceptos(termino:string){
    
    let url = base_url + '/busqueda/coleccion/conceptos/' + termino;
    return this.http.get(url)
      .pipe(
        map((resp:any)=> resp.conceptos)
      )
            

  }
}
