import { GraficoDonaComponent } from './../components/grafico-dona/grafico-dona.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms'

// ng2 - charts
import { ChartsModule } from 'ng2-charts';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

//temporal
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent

    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }