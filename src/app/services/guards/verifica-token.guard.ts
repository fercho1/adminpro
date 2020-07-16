import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class VerificaTokenGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}


  canActivate():  Promise<boolean> | boolean  {
    //console.log('VerificaTokenGuard');


    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }
    
    
    //console.log(payload);

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp:number):Promise<boolean>{
    return new Promise ((resolve,reject)=>{
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      //Falta 1 hora para que el token expire , hay que ir a Dashboard para renovar el token
      ahora.setTime(ahora.getTime()+(1*60*60*1000));  //1 hora
      //console.log(tokenExp);
      //console.log(ahora);
      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
            .subscribe(()=>{
              resolve(true);
            },()=>{
              this.router.navigate(['/login']);
              reject(false);
            });
      }

      resolve(true);
    })
  }

  expirado(fechaExp:number){
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }
  }
  
}
