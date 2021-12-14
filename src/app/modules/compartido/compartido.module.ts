import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ToastComponent } from './toast/toast.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExisteImagenPipe } from './pipes/solicitud/existe-imagen.pipe';
import { ObtenerEstadoSolicitudPipe } from './pipes/solicitud/obtener-estado-solicitud.pipe';
import { ObtenerLineaInvestigacionPipe } from './pipes/solicitud/obtener-linea-investigacion.pipe';
import { ObtenerTipoSolicitudPipe } from './pipes/solicitud/obtener-tipo-solicitud.pipe';
import { ObtenerModalidadPipe } from './pipes/solicitud/obtener-modalidad.pipe';
import { ObtenerNombreJuradoPipe } from './pipes/evaluacion/obtener-nombre-jurado.pipe';
import { ObtenerNombreTrabajoPipe } from './pipes/evaluacion/obtener-nombre-trabajo.pipe';
import { ObtenerFechaPipe } from './pipes/evaluacion/obtener-fecha.pipe';
import { ObtenerEstadoInvitacionPipe } from './pipes/evaluacion/obtener-estado-invitacion.pipe';
import { ObtenerInvitacionEvaluarPipe } from './pipes/evaluacion/obtener-invitacion-evaluar.pipe';
import { ObtenerJuradoPorInvitacionPipe } from './pipes/evaluacion/obtener-jurado-por-invitacion.pipe';
import { ObtenerTrabajoPorInvitacionPipe } from './pipes/evaluacion/obtener-trabajo-por-invitacion.pipe';


@NgModule({
  declarations: [
    ModalComponent,
    ToastComponent,
    ExisteImagenPipe,
    ObtenerEstadoSolicitudPipe,
    ObtenerLineaInvestigacionPipe,
    ObtenerTipoSolicitudPipe,
    ObtenerModalidadPipe,
    ObtenerNombreJuradoPipe,
    ObtenerNombreTrabajoPipe,
    ObtenerFechaPipe,
    ObtenerEstadoInvitacionPipe,
    ObtenerInvitacionEvaluarPipe,
    ObtenerJuradoPorInvitacionPipe,
    ObtenerTrabajoPorInvitacionPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ModalComponent,
    ToastComponent,
    ExisteImagenPipe,
    ObtenerEstadoSolicitudPipe,
    ObtenerLineaInvestigacionPipe,
    ObtenerTipoSolicitudPipe,
    ObtenerModalidadPipe,
    ObtenerNombreJuradoPipe,
    ObtenerNombreTrabajoPipe,
    ObtenerFechaPipe,
    ObtenerEstadoInvitacionPipe,
    ObtenerInvitacionEvaluarPipe,
    ObtenerJuradoPorInvitacionPipe,
    ObtenerTrabajoPorInvitacionPipe
  ]
})
export class CompartidoModule { }
