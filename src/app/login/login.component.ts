import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/service.index';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'  ]
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  password: string;
  

  auth2: any;

  constructor(public router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.renderButton();
    /* this.googleInit(); */

      this.email = localStorage.getItem('email') || '';
      this.password = localStorage.getItem('password') || '';
      

      
      if(this.email.length > 1){
        this.recuerdame = true;
      }
      

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.googleInit();

  }

  async googleInit(){
    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;

      /* this.attachSigin(document.getElementById('btnGoogle')); */
      this.attachSigin(document.getElementById('my-signin2'));

   
  }

  attachSigin(element){

    this.auth2.attachClickHandler(element,{},(googleUser)=>{

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle(token)
        .subscribe(()=> window.location.href='#/dashboard');
      //console.log(token);
    });

  }

  ingresar(forma: NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email,forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recuerdame)
          .subscribe(correcto=> this.router.navigate(['/dashboard']));


    /* console.log(forma.valid);
    console.log(forma.value);
     *///console.log('ingresar');
    //this.router.navigate(['/dashboard']);
  }

}
