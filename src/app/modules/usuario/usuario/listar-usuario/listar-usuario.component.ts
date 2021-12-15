import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { UsuarioConRolesModel } from 'src/app/models/usuario/usuario-con-roles.model';
import { UsuarioModel } from '../../../../models/usuario/usuario.model';
import { UsuarioService } from '../../../../servicios/usuario/usuario.service';
import { UsuarioRolService } from '../../../../servicios/usuario/usuario-rol.service';
import { RolService } from '../../../../servicios/usuario/rol.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  terminoBusqueda?: string;
  terminoFiltro: string = "";

  faArrowLeft = faArrowLeft;

  usuarios?: UsuarioConRolesModel[];

  constructor(
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioRolService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(filtroRoles?: string): void {
    this.usuarioService.GetRecordList()
      .subscribe({
        next: async (usuarios) => {
          const usuariosSinRoles = usuarios;
          
          this.usuarios = await Promise.all(usuariosSinRoles.map(async (usuario) => {                    
            let roles = await firstValueFrom(this.usuarioRolService.GetRecordList(usuario._id!));
            
            return {
              ...usuario,
              roles
            }
          }))

          if (filtroRoles) {
            this.usuarios = this.usuarios.filter(usuario => usuario.roles?.find((value) => value.nombre === filtroRoles))
          }
        }
      })
  }

  filtrarRol(){
    if (this.terminoFiltro === '') {

      this.obtenerUsuarios();
    
    } else {

      this.usuarios = undefined;
      this.obtenerUsuarios(this.terminoFiltro);

    }
    
  }

}
