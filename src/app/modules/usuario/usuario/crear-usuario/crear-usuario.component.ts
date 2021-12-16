import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RolModel } from '../../../../models/usuario/rol.model';
import { existeArregloValidator } from '../../../../validators/existeArreglo.validator';
import { RolService } from '../../../../servicios/usuario/rol.service';
import { ValidadoresService } from '../../../../servicios/compartidos/validadores.service';
import { UsuarioModel } from '../../../../models/usuario/usuario.model';
import { UsuarioService } from '../../../../servicios/usuario/usuario.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { UsuarioRolService } from '../../../../servicios/usuario/usuario-rol.service';
import { GeneralData } from 'src/app/config/general-data';
import { Router } from '@angular/router';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit, OnDestroy {
  formularioUsuario = new FormGroup({});

  opcionesDeRoles: RolModel[] = [];
  rolesSeleccionados: RolModel[] = [];

  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private usuarioRolService: UsuarioRolService,
    private validadoresService: ValidadoresService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
    this.inicializarFormulario();
  }

  ngOnDestroy(): void {
  }

  inicializarFormulario(): void {
    this.formularioUsuario = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.minLength(5)], [this.validadoresService.existeDocumentoUsuario()]],
      email: ['', [Validators.required, Validators.email], [this.validadoresService.existeEmailUsuario()]],
      roles: [''],
      telefono: ['']
    }, { validators: existeArregloValidator(this.rolesSeleccionados) })
  }

  obtenerRoles() {
    this.rolService.GetRecordList()
      .pipe(
        map(roles => roles.filter(rol => rol.nombre?.toUpperCase() !== 'EVALUADOR'))
      ).subscribe(roles => this.opcionesDeRoles = roles);
  }

  resetearSelect(controlName: string) {
    let rolInput = this.formularioUsuario.get(controlName)?.value;
    rolInput = JSON.parse(rolInput) as RolModel;

    const elementoYaExistente = this.rolesSeleccionados.some(rol => rol._id === rolInput._id);

    if (!elementoYaExistente) {
      this.rolesSeleccionados.push(rolInput);
    }

    this.formularioUsuario.get(controlName)?.setValue("");
  }

  eliminarElementoArreglo(indice: number) {
    this.rolesSeleccionados.splice(indice, 1);

    this.formularioUsuario.get('roles')?.setValue("");
  }

  crearUsuario() {
    const usuario: UsuarioModel = {
      nombres: this.nombresControl?.value,
      apellidos: this.apellidosControl?.value,
      documento: this.documentoControl?.value,
      fecha_nacimiento: this.fechaNacimientoControl?.value,
      correo: this.emailControl?.value
    }

    this.usuarioService.GuardarRegistro(usuario).subscribe({
      next: (usuario) => {
        const rolIds = this.rolesSeleccionados.map(rol => rol._id!);
        this.usuarioRolService.AsociarUsuarioRoles(usuario._id!, rolIds)
          .subscribe({
            next: () => {
              this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION("El usuario") })
              this.router.navigateByUrl('/usuario/listar-usuario');
            },
            error: (error: any) => {
              console.error(error)
              this.toastService.openToast({ tipo: 'error', mensaje: "Error al asociar el jurado y los roles" })
            }
          })
      },
      error: (error: any) => {
        console.error(error)
        this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_MENSAJE_CREACION("El usuario") })
      }
    })
  }

  get nombresControl() {
    return this.formularioUsuario.get('nombres')
  }

  get apellidosControl() {
    return this.formularioUsuario.get('apellidos')
  }

  get documentoControl() {
    return this.formularioUsuario.get('documento')
  }

  get fechaNacimientoControl() {
    return this.formularioUsuario.get('fechaNacimiento')

  }

  get emailControl() {
    return this.formularioUsuario.get('email')
  }
}
