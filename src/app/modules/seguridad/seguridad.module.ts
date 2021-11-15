import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

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
    SeguridadRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class SeguridadModule { }
