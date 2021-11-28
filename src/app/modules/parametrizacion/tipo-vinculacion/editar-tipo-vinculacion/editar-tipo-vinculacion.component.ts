import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-tipo-vinculacion',
  templateUrl: './editar-tipo-vinculacion.component.html',
  styleUrls: ['./editar-tipo-vinculacion.component.css']
})
export class EditarTipoVinculacionComponent implements OnInit {

  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoVinculacionService,
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
      next:(data: TipoVinculacionModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
      }
    });
  }

  CrearRegistro(){
    let model = new TipoVinculacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    this.service.EditarRegistro(model).subscribe({
      next: (data: TipoVinculacionModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_EDICION('El tipo de vinculación')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-tipo-vinculacion"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_EDICION('El tipo de vinculación')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
