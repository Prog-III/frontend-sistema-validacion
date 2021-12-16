import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioRolService } from '../../../../servicios/usuario/usuario-rol.service';
import { UsuarioService } from '../../../../servicios/usuario/usuario.service';
import { RolService } from '../../../../servicios/usuario/rol.service';
import { RolModel } from '../../../../models/seguridad/role.model';
import { existeArregloValidator } from 'src/app/validators/existeArreglo.validator';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ValidadoresService } from '../../../../servicios/compartidos/validadores.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { GeneralData } from 'src/app/config/general-data';
import * as dayjs from 'dayjs';
import { map } from 'rxjs';
import { UsuarioModel } from '../../../../models/usuario/usuario.model';
import { UsuarioRolModel } from '../../../../models/usuario/usuario-rol.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  formularioUsuario?: FormGroup;

  opcionesDeRoles: RolModel[] = [];
  rolesSeleccionados: RolModel[] = [];

  idUsuario?: string;

  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private validadoresService: ValidadoresService,
    private usuarioRolService: UsuarioRolService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private toastService: ToastService
  ) {
    this.idUsuario = this.route.snapshot.params['idUsuario'];
  }

  ngOnInit(): void {
    this.rolService.GetRecordList()
      .pipe(map(roles => roles.filter(rol => rol.nombre?.toUpperCase() !== 'EVALUADOR')))
      .subscribe({
        next: (roles) => {
          this.opcionesDeRoles = roles;

          this.usuarioRolService.GetRecordList(this.idUsuario!)
            .subscribe({
              next: (roles) => {
                this.rolesSeleccionados = roles;

                this.crearFormulario();
                this.buscarRegistro();
              }
            })
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA("los roles") })
        }
      })
  }

  crearFormulario(): void {
    this.formularioUsuario = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      estado: [false],
      roles: [''],
      telefono: ['']
    }, { validators: existeArregloValidator(this.rolesSeleccionados) })
  }

  buscarRegistro(): void {
    this.usuarioService.BuscarRegistro(this.idUsuario!)
      .subscribe(usuario => {
        this.formularioUsuario?.get('nombres')?.setValue(usuario.nombres);
        this.formularioUsuario?.get('apellidos')?.setValue(usuario.apellidos);
        this.formularioUsuario?.get('documento')?.setValue(usuario.documento);
        this.formularioUsuario?.get('email')?.setValue(usuario.correo);
        this.formularioUsuario?.get('fechaNacimiento')?.setValue(dayjs(usuario.fecha_nacimiento).format('YYYY-MM-DD'));
        this.formularioUsuario?.get('telefono')?.setValue(usuario.celular);
        this.formularioUsuario?.get('estado')?.setValue(usuario.estado);

        this.formularioUsuario?.get('email')?.
          setAsyncValidators(this.validadoresService.existeEmailUsuario(usuario.correo));

        this.formularioUsuario?.get('documento')?.
          setAsyncValidators(this.validadoresService.existeDocumentoUsuario(usuario.documento));
      })

  }

  editarUsuario() {
    const modeloUsuario: UsuarioModel = {
      _id: this.idUsuario,
      nombres: this.formularioUsuario?.get('nombres')?.value,
      apellidos: this.formularioUsuario?.get('apellidos')?.value,
      documento: this.formularioUsuario?.get('documento')?.value,
      correo: this.formularioUsuario?.get('email')?.value,
      fecha_nacimiento: this.formularioUsuario?.get('fechaNacimiento')?.value,
      celular: this.formularioUsuario?.get('telefono')?.value,
      estado: this.formularioUsuario?.get('estado')?.value
    }

    this.usuarioService.EditarRegistro(modeloUsuario).subscribe({
      next: () => {

        let idRoles = this.rolesSeleccionados.map(rol => rol._id!)
        this.usuarioRolService.GetRecordList(this.idUsuario!).subscribe({
          next: (rolesDelUsuario) => {

            const idRolesComparacion = rolesDelUsuario.map(rol => rol._id);

            idRolesComparacion.forEach(idRol => {
              if (!idRoles.includes(idRol!)) {
                const usuarioRolParaEliminar: UsuarioRolModel = {
                  id_usuario: this.idUsuario,
                  id_rol: idRol
                }

                this.usuarioRolService.EliminarRegistro(usuarioRolParaEliminar).subscribe()
                idRoles = idRoles.filter(idDeRol => idDeRol !== idRol)
              }
            })

            this.usuarioRolService.AsociarUsuarioRoles(this.idUsuario!, idRoles).subscribe();

          }
        })

        this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_EDICION("El usuario") })
        this.router.navigateByUrl('/usuario/listar-usuario');

      },
      error: (error: any) => {
        console.error(error);
        this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_EDICION("El usuario") })
      }
    })
  }

  resetearSelect(controlName: string) {
    let rolInput = this.formularioUsuario?.get(controlName)?.value;
    rolInput = JSON.parse(rolInput) as RolModel;

    const elementoYaExistente = this.rolesSeleccionados.some(rol => rol._id === rolInput._id);

    if (!elementoYaExistente) {
      this.rolesSeleccionados.push(rolInput);
    }

    this.formularioUsuario?.get(controlName)?.setValue("");
  }

  eliminarElementoArreglo(indice: number) {
    this.rolesSeleccionados.splice(indice, 1);

    this.formularioUsuario?.get('roles')?.setValue("");
  }

  get nombresControl() {
    return this.formularioUsuario?.get('nombres')
  }

  get apellidosControl() {
    return this.formularioUsuario?.get('apellidos')
  }

  get documentoControl() {
    return this.formularioUsuario?.get('documento')
  }

  get fechaNacimientoControl() {
    return this.formularioUsuario?.get('fechaNacimiento')

  }

  get emailControl() {
    return this.formularioUsuario?.get('email')
  }
}
