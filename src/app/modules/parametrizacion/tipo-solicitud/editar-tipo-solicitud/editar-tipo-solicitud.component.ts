import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-editar-tipo-solicitud',
  templateUrl: './editar-tipo-solicitud.component.html',
  styleUrls: ['./editar-tipo-solicitud.component.css']
})
export class EditarTipoSolicitudComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});
subidaarchivo:boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private cargaArchivos: CargaArchivosService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      formato: ['', [Validators.required]]

    });
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe(
      (data: TipoSolicitudModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
        this.formulario.controls["formato"].setValue(data.formato)
      },
      (err)=>{
        this.router.navigate(["/home"]);
      }
    );
  }

  CrearRegistro(){
    const formData = new FormData();
    formData.append('file', this.formulario.get('formato')?.value);


    let model = new TipoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id=Number(this.route.snapshot.params['id'])
    console.log(model);
    console.log(this.formulario.get('formato')?.value);
    
    if(this.subidaarchivo){
    this.cargaArchivos.GuardarRegistro(this.formulario.get('formato')?.value).subscribe({
      next: (data: any) =>{
        model.formato=data.name;
         this.service.EditarRegistro(model).subscribe({
          next: (data: TipoSolicitudModel) =>{
            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_EDICION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
          },
          error: (err:any)=>{
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_EDICION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      },
      
    });
    }else{
      model.formato = this.formulario.controls['formato'].value;
      console.log(model);
      
      this.service.EditarRegistro(model).subscribe({
        next: (data: TipoSolicitudModel) =>{
          const mensajeToast: ToastData = {
            tipo: 'success',
            mensaje: GeneralData.TOAST_MENSAJE_EDICION('El tipo de solicitud')
          }
          this.toastService.openToast(mensajeToast);
          this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
        },
        error: (err:any)=>{
          const mensajeToast: ToastData = {
            tipo: 'error',
            mensaje: GeneralData.TOAST_ERROR_EDICION('El tipo de solicitud')
          }
          this.toastService.openToast(mensajeToast);
          
        }
      });

    }
}

onChangeImageFile(event: any) {
  if (event.target.value) {
   
this.subidaarchivo=true;
    this.formulario.get('formato')?.setValue(event.target.files[0]);
    
    
  } 
}
}
