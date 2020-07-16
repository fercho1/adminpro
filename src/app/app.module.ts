import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Rutas
import { APP_ROUTES } from './app.routes';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Servicios
import { ServiceModule } from './services/service.module';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
