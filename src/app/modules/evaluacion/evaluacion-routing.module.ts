import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from 'src/app/guardianes/administrador.guard';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { AuxiliarDirectorGuard } from 'src/app/guardianes/auxiliar-director.guard';
import { AuxiliarGuard } from 'src/app/guardianes/auxiliar.guard';
import { EvaluadorGuard } from 'src/app/guardianes/evaluador.guard';
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
import { ResponderInvitacionEvaluarComponent } from './invitacion-evaluar/responder-invitacion-evaluar/responder-invitacion-evaluar.component';
import { EvaluarComponent } from './evaluar-solicitud/evaluar/evaluar.component';

const routes: Routes = [
  {
    path: "crear-invitacion-evaluar/:id",
    component:CrearInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard,  AuxiliarDirectorGuard]
  },
  {
    path: "editar-invitacion-evaluar",
    component:EditarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard,AuxiliarGuard]
  },
  {
    path: "eliminar-invitacion-evaluar",
    component:EliminarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "listar-invitacion-evaluar",
    component:ListarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "responder-invitacion-evaluar/:hash",
    component: ResponderInvitacionEvaluarComponent
  },
  {
    path: "crear-recordatorio",
    component:CrearRecordatorioComponent,
    canActivate:[AutenticadoGuard, AuxiliarDirectorGuard]
  },
  {
    path: "editar-recordatorio",
    component:EditarRecordatorioComponent,
    canActivate:[AutenticadoGuard, AuxiliarDirectorGuard]
  },
  {
    path: "eliminar-recordatorio",
    component:EliminarRecordatorioComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "listar-recordatorio",
    component:ListarRecordatorioComponent,
    canActivate:[AutenticadoGuard, AuxiliarGuard]
  },
  {
    path: "crear-resultado-evaluacion",
    component:CrearResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard, EvaluadorGuard]
  },
  {
    path: "editar-resultado-evaluacion",
    component:EditarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "Eliminar-resultado-evaluacion",
    component:EliminarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "listar-resultado-evaluacion",
    component:ListarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard, AuxiliarDirectorGuard]
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
