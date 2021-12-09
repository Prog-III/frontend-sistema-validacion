import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
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

const routes: Routes = [
  {
    path: "crear-invitacion-evaluar",
    component:CrearInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-invitacion-evaluar",
    component:EditarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-invitacion-evaluar",
    component:EliminarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-invitacion-evaluar",
    component:ListarInvitacionEvaluarComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-recordatorio",
    component:CrearRecordatorioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-recordatorio",
    component:EditarRecordatorioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-recordatorio",
    component:EliminarRecordatorioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-recordatorio",
    component:ListarRecordatorioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-resultado-evaluacion",
    component:CrearResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-resultado-evaluacion",
    component:EditarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "Eliminar-resultado-evaluacion",
    component:EliminarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-resultado-evaluacion",
    component:ListarResultadoEvaluacionComponent,
    canActivate:[AutenticadoGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
