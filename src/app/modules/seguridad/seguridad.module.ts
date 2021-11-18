import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './login/login.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperacionClaveComponent } from './recuperacion-clave/recuperacion-clave.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    LoginComponent,
    CambioClaveComponent,
    RecuperacionClaveComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
