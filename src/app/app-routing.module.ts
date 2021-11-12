import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './public/errors/not-found/not-found.component';
import { HomeComponent } from './public/general/home/home.component';

const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "evaluacion",
    loadChildren: () => import("./modules/evaluacion/evaluacion.module").then(x => x.EvaluacionModule)
  },
  {
    path: "parametrizacion",
    loadChildren: () => import("./modules/parametrizacion/parametrizacion.module").then(x => x.ParametrizacionModule)
  },

  {
    path: "reportes",
    loadChildren: () => import("./modules/reportes/reportes.module").then(x => x.ReportesModule)
  },

  {
    path: "seguridad",
    loadChildren: () => import("./modules/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path: "solicitud",
    loadChildren: () => import("./modules/solicitud/solicitud.module").then(x => x.SolicitudModule)
  },
  {
    path: "usuario",
    loadChildren: () => import("./modules/usuario/usuario.module").then(x => x.UsuarioModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
