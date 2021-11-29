import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { EditarSolicitudComponent } from './solicitud/editar-solicitud/editar-solicitud.component';
import { CrearSolicitudComponent } from './solicitud/crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './solicitud/listar-solicitud/listar-solicitud.component';
import { EliminarSolicitudComponent } from './solicitud/eliminar-solicitud/eliminar-solicitud.component';
import { CrearProponenteComponent } from './proponente/crear-proponente/crear-proponente.component';
import { EditarProponenteComponent } from './proponente/editar-proponente/editar-proponente.component';
import { ListarProponenteComponent } from './proponente/listar-proponente/listar-proponente.component';
import { EliminarProponenteComponent } from './proponente/eliminar-proponente/eliminar-proponente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExisteImagenPipe } from '../../pipes/solicitud/existe-imagen.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ObtenerEstadoSolicitudPipe } from '../../pipes/solicitud/obtener-estado-solicitud.pipe';
import { ObtenerLineaInvestigacionPipe } from '../../pipes/solicitud/obtener-linea-investigacion.pipe';
import { ObtenerTipoSolicitudPipe } from '../../pipes/solicitud/obtener-tipo-solicitud.pipe';

@NgModule({
  declarations: [
    EditarSolicitudComponent,
    CrearSolicitudComponent,
    ListarSolicitudComponent,
    EliminarSolicitudComponent,
    CrearProponenteComponent,
    EditarProponenteComponent,
    ListarProponenteComponent,
    EliminarProponenteComponent,
    ExisteImagenPipe,
    ObtenerEstadoSolicitudPipe,
    ObtenerLineaInvestigacionPipe,
    ObtenerTipoSolicitudPipe
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ]
})
export class SolicitudModule { }
