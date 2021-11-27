import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';


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
            //aqui va el modal
            console.log("Se guardo el mensaje");
            this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
          },
          error: (err:any)=>{
            //modal de error
            console.log(err);
            
            console.log("No se almaceno");
          }
        });
      },
      error: (err:any)=>{
       console.log(err);
       
        console.log("No se almaceno");
      }
    });
    console.log(model);
    
    

  }
  onChangeImageFile(event: any) {
    if (event.target.value) {
     

      this.formulario.get('formato')?.setValue(event.target.files[0]);
      
      
    } 
  }
}
