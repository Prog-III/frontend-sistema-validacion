import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-crear-linea-investigacion',
  templateUrl: './crear-linea-investigacion.component.html',
  styleUrls: ['./crear-linea-investigacion.component.css']
})
export class CrearLineaInvestigacionComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private service: LineaInvestigacionService
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
    let model = new LineaInvestigacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: LineaInvestigacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_CREACION('La linea de investigación ')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-linea-investigacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_CREACION('La linea de investigación')
        }
        this.toastService.openToast(mensajeToast);
      }

  });

  }
}

