import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);


      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            //console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            //console.log('Fallo subida');
            reject(xhr.response);
          }
        }
      };

      let url = base_url + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);


    });


  }


}