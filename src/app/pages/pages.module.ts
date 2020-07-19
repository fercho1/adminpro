import { CommonModule } from '@angular/common';
import { GraficoDonaComponent } from './../components/grafico-dona/grafico-dona.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms'

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';




//Pipe Module
import { PipesModule } from './../pipes/pipes.module';

//Componentes
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { FacturaComponent } from './facturas/factura.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ClienteComponent } from './clientes/cliente.component';
import { VariablesComponent } from './variables/variables.component';
import { MensualIvaComponent } from './mensual-iva/mensual-iva.component';
import { SemestralIvaComponent } from './semestral-iva/semestral-iva.component';
import { ImpuestoRentaComponent } from './impuesto-renta/impuesto-renta.component';
import { GastosPersonalesComponent } from './gastos-personales/gastos-personales.component';
import { RetencionesRelacionComponent } from './retenciones-relacion/retenciones-relacion.component';

@NgModule({
    declarations: [
        
        
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ClientesComponent,
        FacturasComponent,
        FacturaComponent,
        BusquedaComponent,
        ClienteComponent,
        VariablesComponent,
        MensualIvaComponent,
        SemestralIvaComponent,
        ImpuestoRentaComponent,
        GastosPersonalesComponent,
        RetencionesRelacionComponent

    ],
    exports: [
        
        MensualIvaComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})

export class PagesModule { }