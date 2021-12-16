import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { GeneralData } from 'src/app/config/general-data';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-comite',
  templateUrl: './editar-comite.component.html',
  styleUrls: ['./editar-comite.component.css']
})
export class EditarComiteComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ComiteService,
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
    this.service.BuscarRegistro(id).subscribe(
      (data: ComiteModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
      },
      (err)=>{
        console.log("no existe el registro");
        this.router.navigate(["/home"]);
      }
    );
  }

  CrearRegistro(){
    let model = new ComiteModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;

  
    this.service.EditarRegistro(model).subscribe({
      next: (data: ComiteModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_EDICION('El comité')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-comite"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_EDICION('El comité')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
