import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { UsuarioConRolesModel } from 'src/app/models/usuario/usuario-con-roles.model';
import { UsuarioModel } from '../../../../models/usuario/usuario.model';
import { UsuarioService } from '../../../../servicios/usuario/usuario.service';
import { UsuarioRolService } from '../../../../servicios/usuario/usuario-rol.service';
import { RolService } from '../../../../servicios/usuario/rol.service';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  terminoBusqueda?: string;
  terminoFiltro: string = "";

  faArrowLeft = faArrowLeft;

  usuarios?: UsuarioConRolesModel[];

  constructor(
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioRolService,
    private rolService: RolService,
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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

  eliminarUsuario(id: string) {
    const modalData: ModalData = {
      header: "Eliminación de usuario",
      body: "¿Está seguro que desea eliminar el usuario?",
      esModalConfirmacion: true
    }
    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (!confirmacion) return;

        this.usuarioService.EliminarRegistro(id)
          .subscribe({
            next: () => {
              this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION("El usuario") })
              this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => this.router.navigate(['/usuario/listar-usuario']))
            },
            error: (error: any) => {
              this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_ELIMINACION("El usuario") })
            }
          })
      })
    
    this.subscription.add(modalSubscription);
  }

}
