import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';
import { EstadoSolicitudService } from 'src/app/servicios/parametros/estado-solicitud.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-estado-solicitud',
  templateUrl: './editar-estado-solicitud.component.html',
  styleUrls: ['./editar-estado-solicitud.component.css']
})
export class EditarEstadoSolicitudComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EstadoSolicitudService,
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
      (data: EstadoSolicitudModel) => {
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
    let model = new EstadoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    this.service.EditarRegistro(model).subscribe({
      next: (data: EstadoSolicitudModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_EDICION('El estado de solicitud')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-estado-solicitud"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_EDICION('El estado de solicitud')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
