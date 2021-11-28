import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correo-notificacion.model';
import { CorreoNotificacionService } from 'src/app/servicios/parametros/correo-notificacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-crear-correos-notificacion',
  templateUrl: './crear-correos-notificacion.component.html',
  styleUrls: ['./crear-correos-notificacion.component.css']
})
export class CrearCorreosNotificacionComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CorreoNotificacionService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      estado: [true, [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new CorreoNotificacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.correo = this.formulario.controls['correo'].value;
    model.estado = this.formulario.controls['estado'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: CorreoNotificacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_CREACION('El correo de notificación')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-correos-notificacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_CREACION('El correo de notificación')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
