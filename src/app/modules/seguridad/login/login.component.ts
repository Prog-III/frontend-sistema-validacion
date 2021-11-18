import { Component, OnInit } from '@angular/core';
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
    if (!this.formulario.invalid) {
      
      let credenciales = new CredencialesUsuarioModel();
      credenciales.usuario = this.GetDF["usuario"].value;
      credenciales.clave = MD5(this.GetDF["clave"].value).toString();
      this.seguridadService.Login(credenciales).subscribe({
        next: (data: DatosSesionModel) => {
          console.log(data);
          let saved = this.localStorageService.GuardarDatosSesion(data);
          data.isLoggedIn = true;
          this.seguridadService.RefrescarInfoSesion(data);
          this.router.navigate(["/home"]);
        },
        error: (error: any) => {

        },
        complete: () => {

        }
      });
    } else {
      //this.activeModal();
    }

  }

  get GetDF() {
    return this.formulario.controls;
  }

}
