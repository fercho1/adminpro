import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Rango } from 'src/app/models/rango.model';
import { UsuarioService } from '../service.index';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RangoService {

  constructor(public http: HttpClient,
    public _usuarioService: UsuarioService,
    public router: Router) { }

  cargarRangos(desde:number=0) {
  
    let url = base_url + '/rango/todo';
    return this.http.get(url);
   
  }

  borrarRango(id:string){
    
    let url = base_url + '/rango/'+ id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(
        map(resp=>Swal.fire('Rango Borrado','Eliminado correctamente','success'))
      )
            

  }

  actualizarRango(rango:Rango){
    
    let url = base_url + '/rango/' + rango._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, rango)
      .pipe(
        map((resp:any)=> {
          Swal.fire('Rango actualizado','actualizado','success');
          return resp.rango;
        })
      )
                

  }

  crearRango(rango : Rango){

    
    let url = base_url + '/rango';

    if(rango._id){
      //Actualizando
      url += '/'+rango._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url,rango)
        .pipe(
          map((resp:any)=>{
            Swal.fire('Rango actualizado','actualizado', 'success');
            this.router.navigate(['/rangos']);
            return resp.rango;
          })
        )
                  

    }else{
      //Creando

    url += '?token=' + this._usuarioService.token;

    

    return this.http.post(url,rango)
      .pipe(
        map((resp:any)=>{
          Swal.fire('Rango creado','creado', 'success');
          this.router.navigate(['/rangos']);
          return resp.rango;
        })
      )
        
        
      }

  }

  obtenerRango(id:string){
    
    let url = base_url + '/rango/'+ id;
    return this.http.get(url)
      .pipe(
        map((resp:any)=> resp.rango)
      )
            
  }

 

}
