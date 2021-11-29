import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    component:CrearProponenteComponent
  },
  {
    path: "editar-proponente",
    component:EditarProponenteComponent
  },
  {
    path: "eliminar-proponente",
    component:EliminarProponenteComponent
  },
  {
    path: "listar-proponente",
    component:ListarProponenteComponent
  },
  {
    path: "crear-solicitud/:id",
    component:CrearSolicitudComponent
  },
  {
    path: "editar-solicitud",
    component:EditarSolicitudComponent
  },
  {
    path: "eliminar-solicitud",
    component:EliminarSolicitudComponent
  },
  {
    path: "listar-solicitud/:id",
    component:ListarSolicitudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
