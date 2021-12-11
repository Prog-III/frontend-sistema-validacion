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


@NgModule({
  declarations: [
    ModalComponent,
    ToastComponent,
    ExisteImagenPipe,
    ObtenerEstadoSolicitudPipe,
    ObtenerLineaInvestigacionPipe,
    ObtenerTipoSolicitudPipe,
    ObtenerModalidadPipe
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
    ObtenerModalidadPipe
  ]
})
export class CompartidoModule { }
