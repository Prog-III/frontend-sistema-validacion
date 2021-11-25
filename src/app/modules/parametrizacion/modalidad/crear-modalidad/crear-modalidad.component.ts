import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';

import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { ModalidadService } from 'src/app/servicios/parametros/modalidad.service';

@Component({
  selector: 'app-crear-modalidad',
  templateUrl: './crear-modalidad.component.html',
  styleUrls: ['./crear-modalidad.component.css']
})
export class CrearModalidadComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private service: ModalidadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new ModalidadModel();
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: ModalidadModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-modalidad"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se registro");
      }
    });

  }
}
