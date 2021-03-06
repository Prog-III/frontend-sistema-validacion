import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { CrearInvitacionEvaluarComponent } from './invitacion-evaluar/crear-invitacion-evaluar/crear-invitacion-evaluar.component';
import { EditarInvitacionEvaluarComponent } from './invitacion-evaluar/editar-invitacion-evaluar/editar-invitacion-evaluar.component';
import { EliminarInvitacionEvaluarComponent } from './invitacion-evaluar/eliminar-invitacion-evaluar/eliminar-invitacion-evaluar.component';
import { ListarInvitacionEvaluarComponent } from './invitacion-evaluar/listar-invitacion-evaluar/listar-invitacion-evaluar.component';
import { CrearResultadoEvaluacionComponent } from './resultado-evaluacion/crear-resultado-evaluacion/crear-resultado-evaluacion.component';
import { EditarResultadoEvaluacionComponent } from './resultado-evaluacion/editar-resultado-evaluacion/editar-resultado-evaluacion.component';
import { ListarResultadoEvaluacionComponent } from './resultado-evaluacion/listar-resultado-evaluacion/listar-resultado-evaluacion.component';
import { EliminarResultadoEvaluacionComponent } from './resultado-evaluacion/eliminar-resultado-evaluacion/eliminar-resultado-evaluacion.component';
import { CrearRecordatorioComponent } from './recordatorio/crear-recordatorio/crear-recordatorio.component';
import { EditarRecordatorioComponent } from './recordatorio/editar-recordatorio/editar-recordatorio.component';
import { EliminarRecordatorioComponent } from './recordatorio/eliminar-recordatorio/eliminar-recordatorio.component';
import { ListarRecordatorioComponent } from './recordatorio/listar-recordatorio/listar-recordatorio.component';


@NgModule({
  declarations: [
    CrearInvitacionEvaluarComponent,
    EditarInvitacionEvaluarComponent,
    EliminarInvitacionEvaluarComponent,
    ListarInvitacionEvaluarComponent,
    CrearResultadoEvaluacionComponent,
    EditarResultadoEvaluacionComponent,
    ListarResultadoEvaluacionComponent,
    EliminarResultadoEvaluacionComponent,
    CrearRecordatorioComponent,
    EditarRecordatorioComponent,
    EliminarRecordatorioComponent,
    ListarRecordatorioComponent
  ],
  imports: [
    CommonModule,
    EvaluacionRoutingModule
  ]
})
export class EvaluacionModule { }
