import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearComiteComponent } from './comite/crear-comite/crear-comite.component';
import { EditarComiteComponent } from './comite/editar-comite/editar-comite.component';
import { EliminarComiteComponent } from './comite/eliminar-comite/eliminar-comite.component';
import { ListarComiteComponent } from './comite/listar-comite/listar-comite.component';
import { CrearCorreosNotificacionComponent } from './correos-notificacion/crear-correos-notificacion/crear-correos-notificacion.component';
import { EditarCorreosNotificacionComponent } from './correos-notificacion/editar-correos-notificacion/editar-correos-notificacion.component';
import { EliminarCorreosNotificacionComponent } from './correos-notificacion/eliminar-correos-notificacion/eliminar-correos-notificacion.component';
import { ListarCorreosNotificacionComponent } from './correos-notificacion/listar-correos-notificacion/listar-correos-notificacion.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { EditarDepartamentoComponent } from './departamento/editar-departamento/editar-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { CrearEstadoSolicitudComponent } from './estado-solicitud/crear-estado-solicitud/crear-estado-solicitud.component';
import { EditarEstadoSolicitudComponent } from './estado-solicitud/editar-estado-solicitud/editar-estado-solicitud.component';
import { EliminarEstadoSolicitudComponent } from './estado-solicitud/eliminar-estado-solicitud/eliminar-estado-solicitud.component';
import { ListarEstadoSolicitudComponent } from './estado-solicitud/listar-estado-solicitud/listar-estado-solicitud.component';
import { CrearFacultadComponent } from './facultad/crear-facultad/crear-facultad.component';
import { EditarFacultadComponent } from './facultad/editar-facultad/editar-facultad.component';
import { EliminarFacultadComponent } from './facultad/eliminar-facultad/eliminar-facultad.component';
import { ListarFacultadComponent } from './facultad/listar-facultad/listar-facultad.component';
import { CrearJuradoComponent } from './jurado/crear-jurado/crear-jurado.component';
import { EditarJuradoComponent } from './jurado/editar-jurado/editar-jurado.component';
import { EliminarJuradoComponent } from './jurado/eliminar-jurado/eliminar-jurado.component';
import { ListarJuradoComponent } from './jurado/listar-jurado/listar-jurado.component';
import { CrearLineaInvestigacionComponent } from './linea-investigacion/crear-linea-investigacion/crear-linea-investigacion.component';
import { EditarLineaInvestigacionComponent } from './linea-investigacion/editar-linea-investigacion/editar-linea-investigacion.component';
import { EliminarLineaInvestigacionComponent } from './linea-investigacion/eliminar-linea-investigacion/eliminar-linea-investigacion.component';
import { ListarLineaInvestigacionComponent } from './linea-investigacion/listar-linea-investigacion/listar-linea-investigacion.component';
import { CrearModalidadComponent } from './modalidad/crear-modalidad/crear-modalidad.component';
import { EditarModalidadComponent } from './modalidad/editar-modalidad/editar-modalidad.component';
import { EliminarModalidadComponent } from './modalidad/eliminar-modalidad/eliminar-modalidad.component';
import { ListarModalidadComponent } from './modalidad/listar-modalidad/listar-modalidad.component';
import { CrearTipoSolicitudComponent } from './tipo-solicitud/crear-tipo-solicitud/crear-tipo-solicitud.component';
import { EditarTipoSolicitudComponent } from './tipo-solicitud/editar-tipo-solicitud/editar-tipo-solicitud.component';
import { EliminarTipoSolicitudComponent } from './tipo-solicitud/eliminar-tipo-solicitud/eliminar-tipo-solicitud.component';
import { ListarTipoSolicitudComponent } from './tipo-solicitud/listar-tipo-solicitud/listar-tipo-solicitud.component';
import { CrearTipoVinculacionComponent } from './tipo-vinculacion/crear-tipo-vinculacion/crear-tipo-vinculacion.component';
import { EditarTipoVinculacionComponent } from './tipo-vinculacion/editar-tipo-vinculacion/editar-tipo-vinculacion.component';
import { EliminarTipoVinculacionComponent } from './tipo-vinculacion/eliminar-tipo-vinculacion/eliminar-tipo-vinculacion.component';
import { ListarTipoVinculacionComponent } from './tipo-vinculacion/listar-tipo-vinculacion/listar-tipo-vinculacion.component';

const routes: Routes = [
  {
    path: "crear-comite",
    component: CrearComiteComponent
  },
  {
    path: "editar-comite/:id",
    component:EditarComiteComponent
  },
  {
    path: "eliminar-comite/:id",
    component:EliminarComiteComponent
  },
  {
    path: "listar-comite",
    component:ListarComiteComponent
  },
  {
    path: "crear-correos-notificacion",
    component:CrearCorreosNotificacionComponent
  },
  {
    path: "editar-correos-notificacion/:id",
    component:EditarCorreosNotificacionComponent
  },
  {
    path: "eliminar-correos-notificacion",
    component:EliminarCorreosNotificacionComponent
  },
  {
    path: "listar-correos-notificacion",
    component:ListarCorreosNotificacionComponent
  },
  {
    path: "crear-departamento",
    component:CrearDepartamentoComponent
  },
  {
    path: "editar-departamento",
    component:EditarDepartamentoComponent
  },
  {
    path: "eliminar-departamento",
    component:EliminarDepartamentoComponent
  },
  {
    path: "listar-departamento",
    component:ListarDepartamentoComponent
  },
  {
    path: "crear-estado-solicitud",
    component:CrearEstadoSolicitudComponent
  },
  {
    path: "editar-estado-solicitud",
    component:EditarEstadoSolicitudComponent
  },
  {
    path: "eliminar-estado-solicitud",
    component:EliminarEstadoSolicitudComponent
  },
  {
    path: "listar-estado-solicitud",
    component:ListarEstadoSolicitudComponent
  },
  {
    path: "crear-facultad",
    component:CrearFacultadComponent
  },
  {
    path: "editar-facultad/:id",
    component:EditarFacultadComponent
  },
  {
    path: "eliminar-facultad",
    component:EliminarFacultadComponent
  },
  {
    path: "listar-facultad",
    component:ListarFacultadComponent
  },
  {
    path: "crear-jurado",
    component:CrearJuradoComponent
  },
  {
    path: "editar-jurado",
    component:EditarJuradoComponent
  },
  {
    path: "eliminar-jurado",
    component:EliminarJuradoComponent
  },
  {
    path: "listar-jurado",
    component:ListarJuradoComponent
  },
  {
    path: "crear-linea-investigacion",
    component:CrearLineaInvestigacionComponent
  },
  {
    path: "editar-linea-investigacion",
    component:EditarLineaInvestigacionComponent
  },
  {
    path: "eliminar-linea-investigacion",
    component:EliminarLineaInvestigacionComponent
  },
  {
    path: "listar-linea-investigacion",
    component:ListarLineaInvestigacionComponent
  },
  {
    path: "crear-modalidad",
    component:CrearModalidadComponent
  },
  {
    path: "editar-modalidad",
    component:EditarModalidadComponent
  },
  {
    path: "eliminar-modalidad",
    component:EliminarModalidadComponent
  },
  {
    path: "listar-modalidad",
    component:ListarModalidadComponent
  },
  {
    path: "crear-tipo-solicitud",
    component:CrearTipoSolicitudComponent
  },
  {
    path: "editar-tipo-solicitud",
    component:EditarTipoSolicitudComponent
  },
  {
    path: "eliminar-tipo-solicitud",
    component:EliminarTipoSolicitudComponent
  },
  {
    path: "listar-tipo-solicitud",
    component:ListarTipoSolicitudComponent
  },
  {
    path: "crear-tipo-vinculacion",
    component:CrearTipoVinculacionComponent
  },
  {
    path: "editar-tipo-vinculacion",
    component:EditarTipoVinculacionComponent
  },
  {
    path: "eliminar-tipo-vinculacion",
    component:EliminarTipoVinculacionComponent
  },
  {
    path: "listar-tipo-vinculacion",
    component:ListarTipoVinculacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
