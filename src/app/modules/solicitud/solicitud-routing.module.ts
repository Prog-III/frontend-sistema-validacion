import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from 'src/app/guardianes/administrador.guard';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { AuxiliarDirectorGuard } from 'src/app/guardianes/auxiliar-director.guard';
import { AuxiliarGuard } from 'src/app/guardianes/auxiliar.guard';
import { DirectorGuard } from 'src/app/guardianes/director.guard';
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
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "editar-proponente",
    component:EditarProponenteComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "eliminar-proponente",
    component:EliminarProponenteComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "listar-proponente",
    component:ListarProponenteComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "crear-solicitud/:id",
    component:CrearSolicitudComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "editar-solicitud",
    component:EditarSolicitudComponent,
    canActivate:[AutenticadoGuard, AuxiliarDirectorGuard]
  },
  {
    path: "eliminar-solicitud",
    component:EliminarSolicitudComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "listar-solicitud/:id",
    component:ListarSolicitudComponent,
    canActivate:[AutenticadoGuard,AuxiliarDirectorGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
