import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';

@Component({
  selector: 'app-editar-jurado',
  templateUrl: './editar-jurado.component.html',
  styleUrls: ['./editar-jurado.component.css']
})
export class EditarJuradoComponent implements OnInit {

  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuradoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: [''],
      entidad: ['', [Validators.required]]
    });
    
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: JuradoModel) => {
        console.log(data);
        
        this.formulario.controls["nombre"].setValue(data.nombre)
        this.formulario.controls["email"].setValue(data.email)
        this.formulario.controls["telefono"].setValue(data.telefono)
        this.formulario.controls["entidad"].setValue(data.entidad)
        
      }
    });
  }

  CrearRegistro(){
    let model = new JuradoModel();
    model.id = this.formulario.controls['id'].value;
    model.nombre = this.formulario.controls['nombre'].value;
    model.email = this.formulario.controls['email'].value;
    model.telefono = this.formulario.controls['telefono'].value;
    model.entidad = this.formulario.controls['entidad'].value;
  
    this.service.EditarRegistro(model).subscribe({
      next: (data: JuradoModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-jurado"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }


}
