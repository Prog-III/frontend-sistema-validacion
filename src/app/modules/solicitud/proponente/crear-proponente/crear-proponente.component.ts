import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';
import { ProponenteService } from 'src/app/servicios/seguridad/proponente.service';

@Component({
  selector: 'app-crear-proponente',
  templateUrl: './crear-proponente.component.html',
  styleUrls: ['./crear-proponente.component.css']
})
export class CrearProponenteComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  tipoVinculacionList: TipoVinculacionModel[] = [];
  
  
  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private proponenteService: ProponenteService,
    private tipoVinculacionService: TipoVinculacionService,

  ) { 

  }

  ngOnInit(): void {
    
    
    this.GetTipoVinculacion();
    this.crearFormulario();
  }
  GetTipoVinculacion(){
    this.tipoVinculacionService.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) =>{
        this.tipoVinculacionList = data;
      }
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      primer_nombre: ['', [Validators.required]],
      otros_nombres: [''],
      primer_apellido: ['', [Validators.required]],
      segundo_apellido: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: [''],
      id_tipo_vinculacion: [''],
      image_file: ['', [Validators.required]]
    });
  }


  CrearRegistro() {
    let model = new ProponenteModel();

    const formData = new FormData();

    formData.append('primer_nombre', this.formulario.value.primer_nombre);
    formData.append('otros_nombres', this.formulario.value.otros_nombres);
    formData.append('primer_apellido', this.formulario.value.primer_apellido);
    formData.append('segundo_apellido', this.formulario.value.segundo_apellido);
    formData.append('documento', this.formulario.value.documento);
    formData.append('fecha_nacimiento', this.formulario.value.fecha_nacimiento);
    formData.append('file', this.formulario.get('image_file')?.value);
    formData.append('celular', this.formulario.value.celular);
    formData.append('email', this.formulario.value.email);
    formData.append('id_tipo_vinculacion', this.formulario.value.id_tipo_vinculacion);
   console.log(formData.get('primer_nombre'));
   
    this.proponenteService.GuardarRegistro(formData).subscribe({
      next: (data: ProponenteModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate([`/solicitud/crear-solicitud/${data.id}`]);
      },
      error: (err:any)=>{
        //modal de error
        console.log(err);
        
        console.log("No se almaceno");
      }
    });

  }

  onChangeImageFile(event: any) {
    if (event.target.value) {
      this.formulario.get('image_file')?.setValue(event.target.files[0]);
    } 
  }


}
