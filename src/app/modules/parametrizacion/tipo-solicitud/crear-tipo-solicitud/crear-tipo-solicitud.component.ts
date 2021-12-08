import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { GeneralData } from 'src/app/config/general-data';


@Component({
  selector: 'app-crear-tipo-solicitud',
  templateUrl: './crear-tipo-solicitud.component.html',
  styleUrls: ['./crear-tipo-solicitud.component.css']
})
export class CrearTipoSolicitudComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private service: TipoSolicitudService,
    private cargaArchivos: CargaArchivosService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      formato: ['', [Validators.required]]
    });
  }

   CrearRegistro(){
    const formData = new FormData();
    formData.append('file', this.formulario.get('formato')?.value);


    let model = new TipoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    
    this.cargaArchivos.GuardarRegistro(this.formulario.get('formato')?.value).subscribe({
      next: (data: any) =>{
        model.formato=data.name;
         this.service.GuardarRegistro(model).subscribe({
          next: (data: TipoSolicitudModel) =>{
            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_CREACION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
          },
          error: (err:any)=>{
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_CREACION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      },
     
    });
    console.log(model);
    
    

  }
  onChangeImageFile(event: any) {
    if (event.target.value) {
     

      this.formulario.get('formato')?.setValue(event.target.files[0]);
      
      
    } 
  }
}
