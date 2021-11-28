import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-crear-tipo-vinculacion',
  templateUrl: './crear-tipo-vinculacion.component.html',
  styleUrls: ['./crear-tipo-vinculacion.component.css']
})
export class CrearTipoVinculacionComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    
    private toastService: ToastService,
    private service: TipoVinculacionService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new TipoVinculacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: TipoVinculacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_CREACION('El tipo de vinculacion')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-tipo-vinculacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_CREACION('El tipo de vinculacion')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
