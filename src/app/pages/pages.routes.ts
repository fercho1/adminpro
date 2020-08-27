import { ReportesComponent } from './reportes/reportes.component';
import { GastosPersonalesComponent } from './gastos-personales/gastos-personales.component';
import { ImpuestoRentaComponent } from './impuesto-renta/impuesto-renta.component';
import { SemestralIvaComponent } from './semestral-iva/semestral-iva.component';
import { MensualIvaComponent } from './mensual-iva/mensual-iva.component';
import { VariablesComponent } from './variables/variables.component';
import { ClienteComponent } from './clientes/cliente.component';
import { VerificaTokenGuard } from './../services/guards/verifica-token.guard';
import { AdminGuard } from './../services/service.index';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FacturaComponent } from './facturas/factura.component';
import { FacturasComponent } from './facturas/facturas.component';


import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reportes/reporte.component';


const pagesRoutes: Routes = [

    { 
        path: 'mensualIva', 
        component: MensualIvaComponent,
        canActivate: [VerificaTokenGuard], 
        data: { titulo: 'Declaración mensual de IVA' } 
    },
    { path: 'semestralIva', component: SemestralIvaComponent, data: { titulo: 'Declaración semestral de IVA' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Declaración de Impuesto a la Renta' } },
    { path: 'impuestoRenta', component: ImpuestoRentaComponent, data: { titulo: 'Declaración de Impuesto a la Renta ' } },
    { path: 'gastosPersonales', component: GastosPersonalesComponent, data: { titulo: 'Anexo de Gastos Personales' } },
    { path: 'retencionesRelacion', component: GastosPersonalesComponent, data: { titulo: 'Anexo de Retenciones en la fuente por relación de dependencia' } },
    { path: 'reportes', component: ReportesComponent, data: { titulo: 'Reportes' } },
    { path: 'reporte/:id', component: ReporteComponent, data: { titulo: 'Reporte' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

    //Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Mantenimiento de usuarios' }
    },
    { path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimiento de clientes' } },
    { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Cliente' } },
    { path: 'facturas', component: FacturasComponent, data: { titulo: 'Mantenimiento de facturas' } },
    { path: 'factura/:id', component: FacturaComponent, data: { titulo: 'Factura' } },
    { path: 'variables', component: VariablesComponent, data: { titulo: 'Variables' } },
    { path: '', redirectTo: '/mensualIva', pathMatch: 'full' },




];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);