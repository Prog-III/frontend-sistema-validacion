import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearInvitacionEvaluarComponent } from './invitacion-evaluar/crear-invitacion-evaluar/crear-invitacion-evaluar.component';
import { EditarInvitacionEvaluarComponent } from './invitacion-evaluar/editar-invitacion-evaluar/editar-invitacion-evaluar.component';
import { EliminarInvitacionEvaluarComponent } from './invitacion-evaluar/eliminar-invitacion-evaluar/eliminar-invitacion-evaluar.component';
import { ListarInvitacionEvaluarComponent } from './invitacion-evaluar/listar-invitacion-evaluar/listar-invitacion-evaluar.component';
import { CrearRecordatorioComponent } from './recordatorio/crear-recordatorio/crear-recordatorio.component';
import { EditarRecordatorioComponent } from './recordatorio/editar-recordatorio/editar-recordatorio.component';
import { EliminarRecordatorioComponent } from './recordatorio/eliminar-recordatorio/eliminar-recordatorio.component';
import { ListarRecordatorioComponent } from './recordatorio/listar-recordatorio/listar-recordatorio.component';
import { CrearResultadoEvaluacionComponent } from './resultado-evaluacion/crear-resultado-evaluacion/crear-resultado-evaluacion.component';
import { EditarResultadoEvaluacionComponent } from './resultado-evaluacion/editar-resultado-evaluacion/editar-resultado-evaluacion.component';
import { EliminarResultadoEvaluacionComponent } from './resultado-evaluacion/eliminar-resultado-evaluacion/eliminar-resultado-evaluacion.component';
import { ListarResultadoEvaluacionComponent } from './resultado-evaluacion/listar-resultado-evaluacion/listar-resultado-evaluacion.component';
import { ListarEvaluarSolicitudComponent } from './evaluar-solicitud/listar-evaluar-solicitud/listar-evaluar-solicitud.component';
import { EvaluarComponent } from './evaluar-solicitud/evaluar/evaluar.component';

const routes: Routes = [
  {
    path: "crear-invitacion-evaluar/:id",
    component:CrearInvitacionEvaluarComponent
  },
  {
    path: "editar-invitacion-evaluar",
    component:EditarInvitacionEvaluarComponent
  },
  {
    path: "eliminar-invitacion-evaluar",
    component:EliminarInvitacionEvaluarComponent
  },
  {
    path: "listar-invitacion-evaluar",
    component:ListarInvitacionEvaluarComponent
  },
  {
    path: "crear-recordatorio",
    component:CrearRecordatorioComponent
  },
  {
    path: "editar-recordatorio",
    component:EditarRecordatorioComponent
  },
  {
    path: "eliminar-recordatorio",
    component:EliminarRecordatorioComponent
  },
  {
    path: "listar-recordatorio",
    component:ListarRecordatorioComponent
  },
  {
    path: "crear-resultado-evaluacion",
    component:CrearResultadoEvaluacionComponent
  },
  {
    path: "editar-resultado-evaluacion",
    component:EditarResultadoEvaluacionComponent
  },
  {
    path: "Eliminar-resultado-evaluacion",
    component:EliminarResultadoEvaluacionComponent
  },
  {
    path: "listar-resultado-evaluacion",
    component:ListarResultadoEvaluacionComponent
  },
  {
    path: "listar-evaluar-solicitud/:id",
    component:ListarEvaluarSolicitudComponent
  },
  {
    path: "evaluar/:idjurado/:idsolicitud",
    component:EvaluarComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
