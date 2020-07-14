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
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo:'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo:'Progress'} },
            { path: 'graficas1', component: Graficas1Component, data: {titulo:'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: {titulo:'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {titulo:'RxJs'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo:'Ajustes del tema'} },
            { path: 'perfil', component: ProfileComponent, data: {titulo:'Perfil de usuario'} },
            
            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: {titulo:'Mantenimiento de usuarios'} },
            { path: 'clientes', component: ClientesComponent, data: {titulo:'Mantenimiento de clientes'} },
            { path: 'facturas', component: FacturasComponent, data: {titulo:'Mantenimiento de facturas'} },
            { path: 'factura/:id', component: FacturaComponent, data: {titulo:'Actualizar Medico'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},



        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);