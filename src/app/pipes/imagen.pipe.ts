import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {


    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/casa';
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