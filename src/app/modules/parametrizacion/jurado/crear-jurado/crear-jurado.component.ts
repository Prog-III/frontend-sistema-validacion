import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';

@Component({
  selector: 'app-crear-jurado',
  templateUrl: './crear-jurado.component.html',
  styleUrls: ['./crear-jurado.component.css']
})
export class CrearJuradoComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: JuradoService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefono: [''],
      entidad: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new JuradoModel();
    console.log(model);
    model.nombre = this.formulario.controls['nombre'].value;
    
    model.email = this.formulario.controls['email'].value;
    
    model.telefono = this.formulario.controls['telefono'].value;
    
    model.entidad = this.formulario.controls['entidad'].value;
    
    
    this.service.GuardarRegistro(model).subscribe({
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
