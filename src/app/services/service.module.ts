

import { ModalUploadService } from './../components/modal-upload/modal-upload.service';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SettingsService, 
          SidebarService, 
          SharedService,
          UsuarioService,
          LoginGuardGuard,
          AdminGuard,
          SubirArchivoService,
          ClienteService,
          FacturaService } from './service.index'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SidebarService, 
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    ClienteService,
    FacturaService,
    AdminGuard
  ]
})
export class ServiceModule { }
