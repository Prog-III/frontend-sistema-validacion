import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { LoginComponent } from './login/login.component';
import { RecuperacionClaveComponent } from './recuperacion-clave/recuperacion-clave.component';

const routes: Routes = [
  {
    path: "cambio-clave",
    component:CambioClaveComponent
  },
  {
    path: "login",
    component:LoginComponent
  },
  {
    path: "recuperacion-clave",
    component:RecuperacionClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
