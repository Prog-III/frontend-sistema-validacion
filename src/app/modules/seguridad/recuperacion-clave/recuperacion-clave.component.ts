import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { RecuperarClaveModel } from 'src/app/models/seguridad/recuperarclave.model';
import { RecuperarclaveService } from 'src/app/servicios/seguridad/recuperarclave.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-recuperacion-clave',
  templateUrl: './recuperacion-clave.component.html',
  styleUrls: ['./recuperacion-clave.component.scss']
})
export class RecuperacionClaveComponent implements OnInit {
  
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private service: RecuperarclaveService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required,Validators.email]]
    });
  }

  CrearRegistro(){
    let model = new RecuperarClaveModel();
    model.correo = this.formulario.controls['correo'].value;
    
    this.service.GuardarRegistro(model).subscribe({
      next: (data: RecuperarClaveModel) => {  
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: "La clave se recupero correctamente"
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/seguridad/login"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: "no se pudo recuperar la clave"
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }
}
