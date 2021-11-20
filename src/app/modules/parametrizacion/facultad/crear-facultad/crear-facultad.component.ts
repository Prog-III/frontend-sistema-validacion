import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';

@Component({
  selector: 'app-crear-facultad',
  templateUrl: './crear-facultad.component.html',
  styleUrls: ['./crear-facultad.component.css']
})
export class CrearFacultadComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new FacultadModel();
    model.codigo = this.formulario.controls['codigo'].value;
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: FacultadModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-facultad"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }

}
