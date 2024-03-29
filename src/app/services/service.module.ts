



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
          FacturaService,
          ReporteService,
          VerificaTokenGuard,
          VariableService,
          ImpuestoRentaService,
          RangoService,
          ConceptoService } from './service.index'
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
    ConceptoService,
    FacturaService,
    RangoService,
    ReporteService,
    VariableService,
    ImpuestoRentaService,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
