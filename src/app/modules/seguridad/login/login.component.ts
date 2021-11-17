import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { GeneralData } from 'src/app/config/general-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  testModal: Modal | undefined;
  body: string = '';
  title: string = '';
  key:string =GeneralData.KEY_RECAPTCHA;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      usuario: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(GeneralData.EMAIL_MIN_LONGITUD)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(GeneralData.CLAVE_MIN_LONGITUD)
      ]],
      recaptcha: ['', [Validators.required]]
    })
  }

  get controlUsuario() {
    return this.formulario.get('usuario');
  }

  get controlClave() {
    return this.formulario.get('clave');
  }
  get controlRecaptcha() {
    return this.formulario.get('recaptcha');
  }

  probar() {
    console.log(this.formulario);
  }

  login() {
    if (this.formulario.invalid) {
      this.body = 'Formulario Invalido';
      this.title = 'error';
      this.testModal = new bootstrap.Modal(document.getElementById('mensajeGeneralModal') || '',
        {
          keyboard: false
        });
      this.testModal?.show();
    } else {
      this.body = 'Formulario valido';
      this.title = 'Ingreso sesion';
      this.testModal = new bootstrap.Modal(document.getElementById('mensajeGeneralModal') || '',
        {
          keyboard: false
        });
      this.testModal?.show();
    }

  }
  get GetDF() {
    return this.formulario.controls;
  }

}
