import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from 'src/app/guardianes/autenticado.guard';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuario/eliminar-usuario/eliminar-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {
    path: "crear-usuario",
    component:CrearUsuarioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "editar-usuario",
    component:EditarUsuarioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "eliminar-usuario",
    component:EliminarUsuarioComponent,
    canActivate:[AutenticadoGuard]
  },
  {
    path: "listar-usuario",
    component:ListarUsuarioComponent,
    canActivate:[AutenticadoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
