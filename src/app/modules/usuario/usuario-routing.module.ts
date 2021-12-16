import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from 'src/app/guardianes/administrador.guard';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { AuxiliarGuard } from 'src/app/guardianes/auxiliar.guard';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {
    path: "crear-usuario",
    component:CrearUsuarioComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "editar-usuario/:idUsuario",
    component:EditarUsuarioComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "eliminar-usuario",
    component:EliminarUsuarioComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  },
  {
    path: "listar-usuario",
    component:ListarUsuarioComponent,
    canActivate:[AutenticadoGuard, AdministradorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
