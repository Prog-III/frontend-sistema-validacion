import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperacionClaveComponent } from './recuperacion-clave/recuperacion-clave.component';


@NgModule({
  declarations: [
    LoginComponent,
    CambioClaveComponent,
    RecuperacionClaveComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
