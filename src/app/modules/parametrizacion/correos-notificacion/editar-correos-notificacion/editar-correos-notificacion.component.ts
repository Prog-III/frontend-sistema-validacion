import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correo-notificacion.model';
import { CorreoNotificacionService } from 'src/app/servicios/parametros/correo-notificacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-correos-notificacion',
  templateUrl: './editar-correos-notificacion.component.html',
  styleUrls: ['./editar-correos-notificacion.component.css']
})
export class EditarCorreosNotificacionComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CorreoNotificacionService,
    private toastService: ToastService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      estado: [Boolean, [Validators.required]]
    });
    
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: CorreoNotificacionModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
        this.formulario.controls["correo"].setValue(data.correo)
        this.formulario.controls["estado"].setValue(data.estado)
      }
    });
  }

  CrearRegistro(){
    let model = new CorreoNotificacionModel();
    console.log(this.formulario.controls['estado'].value);

    if(this.formulario.controls['estado'].value === "true"){
      model.estado = true
    }else{
      model.estado = false
    }
    
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    model.correo = this.formulario.controls['correo'].value;
  
    
    this.service.EditarRegistro(model).subscribe({
      next: (data: CorreoNotificacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_EDICION('El correo de notificación')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-correos-notificacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_EDICION('El correo de notificación')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
