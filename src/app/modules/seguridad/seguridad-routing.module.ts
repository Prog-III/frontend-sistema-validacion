import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { NoAutenticadoGuard } from 'src/app/guardianes/no-autenticado.guard';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperacionClaveComponent } from './recuperacion-clave/recuperacion-clave.component';

const routes: Routes = [
  {
    path: "cambio-clave",
    component:CambioClaveComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "login",
    component:LoginComponent,
    canActivate:[NoAutenticadoGuard]
  },
  {
    path: "recuperacion-clave",
    component:RecuperacionClaveComponent,
    canActivate:[NoAutenticadoGuard]
  },
  
  {
    path: "logout",
    component:LogoutComponent,
    canActivate:[AutenticadoGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
