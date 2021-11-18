import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { GeneralData } from 'src/app/config/general-data';
import { MD5 } from 'crypto-js';
import { CredencialesUsuarioModel } from 'src/app/models/seguridad/credenciales-usuario';
import { SeguridadService } from 'src/app/servicios/compartidos/seguridad.service';
import { DatosSesionModel } from 'src/app/models/seguridad/datos_sesion';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ObjetoErrorModel } from '../../../models/seguridad/objetoError';

import { ReCaptcha2Component } from 'ngx-captcha';


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
  key:string = GeneralData.KEY_RECAPTCHA;

  @ViewChild('elementoCaptcha') recaptcha?: ReCaptcha2Component;


  mensajeError: string | undefined;

  constructor(
    private fb: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router,
    private localStorageService: LocalStorageService,
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

  login() {
    if (this.formulario.valid) {
      
      let credenciales = new CredencialesUsuarioModel();
      credenciales.usuario = this.controlesFormulario["usuario"].value;
      credenciales.clave = MD5(this.controlesFormulario["clave"].value).toString();
      this.seguridadService.Login(credenciales).subscribe({
        next: (data: DatosSesionModel) => {
          console.log(data);
          this.localStorageService.GuardarDatosSesion(data);
          
          data.isLoggedIn = true;
          
          this.seguridadService.RefrescarInfoSesion(data);
          this.router.navigate(["/home"]);
        },
        error: (errorResponse: HttpErrorResponse) => {
          const objetoError: ObjetoErrorModel = errorResponse.error.error;

          this.mensajeError = objetoError.message;

          this.formulario.reset();
          this.recaptcha?.reloadCaptcha();
        },
        complete: () => {}
      });
    } else {
      //this.activeModal();
    }
  }

  get controlesFormulario() {
    return this.formulario.controls;
  }

  get usuarioInvalido() {
    return this.controlesFormulario['usuario'].invalid && this.controlesFormulario['usuario'].touched;
  }

  get claveInvalida() {
    return this.controlesFormulario['clave'].invalid && this.controlesFormulario['clave'].touched;
  }

  get recaptchaInvalido() {
    return this.controlesFormulario['recaptcha'].invalid && this.controlesFormulario['recaptcha'].touched;
  }
}
