import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RolModel } from '../../../../models/usuario/rol.model';
import { existeArregloValidator } from '../../../../validators/existeArreglo.validator';
import { RolService } from '../../../../servicios/usuario/rol.service';
import { ValidadoresService } from '../../../../servicios/compartidos/validadores.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  formularioUsuario = new FormGroup({});

  opcionesDeRoles: RolModel[] = [];
  rolesSeleccionados: RolModel[] = [];

  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private validadoresService: ValidadoresService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formularioUsuario = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(5)]],
      apellidos: ['', [Validators.required, Validators.minLength(5)]],
      fechaNacimiento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.minLength(5)], [this.validadoresService.existeDocumentoUsuario()]],
      email: ['', [Validators.required, Validators.email], [this.validadoresService.existeEmailUsuario()]],
      roles: [''],
      telefono: ['']
    }, { validators: existeArregloValidator(this.rolesSeleccionados) })
  }

  obtenerRoles() {
    this.rolService.GetRecordList()
      .subscribe(roles => this.opcionesDeRoles = roles);
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
