import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-linea-investigacion',
  templateUrl: './editar-linea-investigacion.component.html',
  styleUrls: ['./editar-linea-investigacion.component.css']
})
export class EditarLineaInvestigacionComponent implements OnInit {

  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LineaInvestigacionService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: LineaInvestigacionModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
      }
    });
  }

  CrearRegistro(){
    let model = new LineaInvestigacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    this.service.EditarRegistro(model).subscribe({
      next: (data: LineaInvestigacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_EDICION('La linea de investigación')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-linea-investigacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_EDICION('La linea de investigación')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
