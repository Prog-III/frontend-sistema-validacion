import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
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
    component: CrearComiteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-comite/:id",
    component:EditarComiteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-comite/:id",
    component:EliminarComiteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-comite",
    component:ListarComiteComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-correos-notificacion",
    component:CrearCorreosNotificacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-correos-notificacion/:id",
    component:EditarCorreosNotificacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-correos-notificacion",
    component:EliminarCorreosNotificacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-correos-notificacion",
    component:ListarCorreosNotificacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-departamento",
    component:CrearDepartamentoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-departamento/:id",
    component:EditarDepartamentoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-departamento",
    component:EliminarDepartamentoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-departamento",
    component:ListarDepartamentoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-estado-solicitud",
    component:CrearEstadoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-estado-solicitud/:id",
    component:EditarEstadoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-estado-solicitud",
    component:EliminarEstadoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-estado-solicitud",
    component:ListarEstadoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-facultad",
    component:CrearFacultadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-facultad/:id",
    component:EditarFacultadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-facultad",
    component:EliminarFacultadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-facultad",
    component:ListarFacultadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-jurado",
    component:CrearJuradoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-jurado/:id",
    component:EditarJuradoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-jurado",
    component:EliminarJuradoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-jurado",
    component:ListarJuradoComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-linea-investigacion",
    component:CrearLineaInvestigacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-linea-investigacion/:id",
    component:EditarLineaInvestigacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-linea-investigacion",
    component:EliminarLineaInvestigacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-linea-investigacion",
    component:ListarLineaInvestigacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-modalidad",
    component:CrearModalidadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-modalidad/:id",
    component:EditarModalidadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-modalidad",
    component:EliminarModalidadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-modalidad",
    component:ListarModalidadComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-tipo-solicitud",
    component:CrearTipoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-tipo-solicitud/:id",
    component:EditarTipoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-tipo-solicitud",
    component:EliminarTipoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-tipo-solicitud",
    component:ListarTipoSolicitudComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "crear-tipo-vinculacion",
    component:CrearTipoVinculacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-tipo-vinculacion/:id",
    component:EditarTipoVinculacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-tipo-vinculacion",
    component:EliminarTipoVinculacionComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-tipo-vinculacion",
    component:ListarTipoVinculacionComponent,
    canActivate:[AutenticadoGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
