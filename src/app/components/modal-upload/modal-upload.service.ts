import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public img:string;

  public oculto: string='oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { 
    //console.log('Modal service listo');
  }

  ocultarModal(){
    this.oculto='oculto';
    this.id= null;
    this.tipo= null;
  }
  //http://localhost:3000/img/usuarios/5f0a124a579f8917c00481cd.png

  mostrarModal(
    tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string
  ){
    this.oculto='';
    this.id= id;
    this.tipo= tipo;
    //this.img = img;
    if(img.includes('https')){
      this.img = img;    
    }else {
      this.img =  `${base_url}/img/${tipo}/${img}`; 
    }
    //console.log(this.img);
  }
}