import { DOCUMENT } from '@angular/common';
import { Usuario } from './../models/usuario.model';
import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/service.index';

import Swal from 'sweetalert2'

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
              public _usuarioService: UsuarioService,
              @Inject(DOCUMENT) private _document,
              private ngZone: NgZone) { }

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

    /* this.googleInit(); */
    this.startApp();

  }

  async startApp() {
    
    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this._usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

  

 /*  async googleInit(){
    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;

      
      this.attachSigin(document.getElementById('my-signin2'));

   
  }

  attachSigin(element){

    this.auth2.attachClickHandler(element,{},(googleUser)=>{

      
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle(token)
        .subscribe(()=> window.location.href='#/mensualIva');
      
    });

  } */

  ingresar(forma: NgForm){

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email,forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recuerdame)
          .subscribe(correcto=> {
            
            this.router.navigate(['/facturas']);
          } , (err) => {
            Swal.fire('Error en el login',err.error.mensaje,'error');
          });


    /* console.log(forma.valid);
    console.log(forma.value);
     *///console.log('ingresar');
    //this.router.navigate(['/mensualIva']);
  }

  myFunction() {
    let x = this._document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  

}
