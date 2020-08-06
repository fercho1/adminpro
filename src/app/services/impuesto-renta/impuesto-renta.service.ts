import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ImpuestoRentaService {

  

  constructor(public http: HttpClient) { }

  cargarFacturasAgrupadas() {

    let a: any;
    let b: any;
    let c: any;

    let url = URL_SERVICIOS + '/factura/groups';
    return this.http.get(url).pipe(
      map(resp=>{   
        return resp['facturas'];
      })
    );


  }
}
