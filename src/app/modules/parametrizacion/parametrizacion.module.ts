import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrizacionRoutingModule } from './parametrizacion-routing.module';
import { CrearFacultadComponent } from './facultad/crear-facultad/crear-facultad.component';
import { EditarFacultadComponent } from './facultad/editar-facultad/editar-facultad.component';
import { EliminarFacultadComponent } from './facultad/eliminar-facultad/eliminar-facultad.component';
import { ListarFacultadComponent } from './facultad/listar-facultad/listar-facultad.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento/editar-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { CrearLineaInvestigacionComponent } from './linea-investigacion/crear-linea-investigacion/crear-linea-investigacion.component';
import { EditarLineaInvestigacionComponent } from './linea-investigacion/editar-linea-investigacion/editar-linea-investigacion.component';
import { EliminarLineaInvestigacionComponent } from './linea-investigacion/eliminar-linea-investigacion/eliminar-linea-investigacion.component';
import { ListarLineaInvestigacionComponent } from './linea-investigacion/listar-linea-investigacion/listar-linea-investigacion.component';
import { CrearTipoVinculacionComponent } from './tipo-vinculacion/crear-tipo-vinculacion/crear-tipo-vinculacion.component';
import { EditarTipoVinculacionComponent } from './tipo-vinculacion/editar-tipo-vinculacion/editar-tipo-vinculacion.component';
import { EliminarTipoVinculacionComponent } from './tipo-vinculacion/eliminar-tipo-vinculacion/eliminar-tipo-vinculacion.component';
import { ListarTipoVinculacionComponent } from './tipo-vinculacion/listar-tipo-vinculacion/listar-tipo-vinculacion.component';
import { CrearTipoSolicitudComponent } from './tipo-solicitud/crear-tipo-solicitud/crear-tipo-solicitud.component';
import { EditarTipoSolicitudComponent } from './tipo-solicitud/editar-tipo-solicitud/editar-tipo-solicitud.component';
import { EliminarTipoSolicitudComponent } from './tipo-solicitud/eliminar-tipo-solicitud/eliminar-tipo-solicitud.component';
import { ListarTipoSolicitudComponent } from './tipo-solicitud/listar-tipo-solicitud/listar-tipo-solicitud.component';
import { CrearEstadoSolicitudComponent } from './estado-solicitud/crear-estado-solicitud/crear-estado-solicitud.component';
import { EditarEstadoSolicitudComponent } from './estado-solicitud/editar-estado-solicitud/editar-estado-solicitud.component';
import { EliminarEstadoSolicitudComponent } from './estado-solicitud/eliminar-estado-solicitud/eliminar-estado-solicitud.component';
import { ListarEstadoSolicitudComponent } from './estado-solicitud/listar-estado-solicitud/listar-estado-solicitud.component';
import { CrearModalidadComponent } from './modalidad/crear-modalidad/crear-modalidad.component';
import { EditarModalidadComponent } from './modalidad/editar-modalidad/editar-modalidad.component';
import { EliminarModalidadComponent } from './modalidad/eliminar-modalidad/eliminar-modalidad.component';
import { ListarModalidadComponent } from './modalidad/listar-modalidad/listar-modalidad.component';
import { CrearComiteComponent } from './comite/crear-comite/crear-comite.component';
import { EditarComiteComponent } from './comite/editar-comite/editar-comite.component';
import { EliminarComiteComponent } from './comite/eliminar-comite/eliminar-comite.component';
import { ListarComiteComponent } from './comite/listar-comite/listar-comite.component';
import { CrearCorreosNotificacionComponent } from './correos-notificacion/crear-correos-notificacion/crear-correos-notificacion.component';
import { EditarCorreosNotificacionComponent } from './correos-notificacion/editar-correos-notificacion/editar-correos-notificacion.component';
import { EliminarCorreosNotificacionComponent } from './correos-notificacion/eliminar-correos-notificacion/eliminar-correos-notificacion.component';
import { ListarCorreosNotificacionComponent } from './correos-notificacion/listar-correos-notificacion/listar-correos-notificacion.component';
import { CrearJuradoComponent } from './jurado/crear-jurado/crear-jurado.component';
import { EditarJuradoComponent } from './jurado/editar-jurado/editar-jurado.component';
import { EliminarJuradoComponent } from './jurado/eliminar-jurado/eliminar-jurado.component';
import { ListarJuradoComponent } from './jurado/listar-jurado/listar-jurado.component';


@NgModule({
  declarations: [
    CrearFacultadComponent,
    EditarFacultadComponent,
    EliminarFacultadComponent,
    ListarFacultadComponent,
    CrearDepartamentoComponent,
    EditarDepartamentoComponent,
    EliminarDepartamentoComponent,
    ListarDepartamentoComponent,
    CrearLineaInvestigacionComponent,
    EditarLineaInvestigacionComponent,
    EliminarLineaInvestigacionComponent,
    ListarLineaInvestigacionComponent,
    CrearTipoVinculacionComponent,
    EditarTipoVinculacionComponent,
    EliminarTipoVinculacionComponent,
    ListarTipoVinculacionComponent,
    CrearTipoSolicitudComponent,
    EditarTipoSolicitudComponent,
    EliminarTipoSolicitudComponent,
    ListarTipoSolicitudComponent,
    CrearEstadoSolicitudComponent,
    EditarEstadoSolicitudComponent,
    EliminarEstadoSolicitudComponent,
    ListarEstadoSolicitudComponent,
    CrearModalidadComponent,
    EditarModalidadComponent,
    EliminarModalidadComponent,
    ListarModalidadComponent,
    CrearComiteComponent,
    EditarComiteComponent,
    EliminarComiteComponent,
    ListarComiteComponent,
    CrearCorreosNotificacionComponent,
    EditarCorreosNotificacionComponent,
    EliminarCorreosNotificacionComponent,
    ListarCorreosNotificacionComponent,
    CrearJuradoComponent,
    EditarJuradoComponent,
    EliminarJuradoComponent,
    ListarJuradoComponent
  ],
  imports: [
    CommonModule,
    ParametrizacionRoutingModule
  ]
})
export class ParametrizacionModule { }
