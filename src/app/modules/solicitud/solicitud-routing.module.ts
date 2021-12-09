import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { CrearProponenteComponent } from './proponente/crear-proponente/crear-proponente.component';
import { EditarProponenteComponent } from './proponente/editar-proponente/editar-proponente.component';
import { EliminarProponenteComponent } from './proponente/eliminar-proponente/eliminar-proponente.component';
import { ListarProponenteComponent } from './proponente/listar-proponente/listar-proponente.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  {
    path: "crear-proponente",
    component:CrearProponenteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-proponente",
    component:EditarProponenteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-proponente",
    component:EliminarProponenteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-proponente",
    component:ListarProponenteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-solicitud/:id",
    component:CrearSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-solicitud",
    component:EditarSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-solicitud",
    component:EliminarSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-solicitud/:id",
    component:ListarSolicitudComponent,
    canActivate:[AutenticadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
