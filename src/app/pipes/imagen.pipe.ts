import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    /* let url = URL_SERVICIOS + '/img'; */
    let url = base_url + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;

      case 'cliente':
        url += '/clientes/' + img;
        break;

      case 'factura':
        url += '/facturas/' + img;
        break;

      default:
        console.log('Tipo de imagen no existe,usu,cli,fact');
         url += '/usuarios/xxx';
    }

    return url;
  }

}
