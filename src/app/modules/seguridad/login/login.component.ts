import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GeneralData } from 'src/app/config/general-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      usuario: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(GeneralData.EMAIL_MIN_LONGITUD)
      ]],
      clave: ['', [
        Validators.required,
        Validators.minLength(GeneralData.CLAVE_MIN_LONGITUD)
      ]]
    })
  }

  get controlUsuario() {
    return this.formulario.get('usuario');
  }

  get controlClave() {
    return this.formulario.get('clave');
  }

  probar() {
    console.log(this.formulario);
  }

}
