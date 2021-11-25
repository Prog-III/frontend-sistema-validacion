import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { Linea_InvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion-service';

@Component({
  selector: 'app-crear-linea-investigacion',
  templateUrl: './crear-linea-investigacion.component.html',
  styleUrls: ['./crear-linea-investigacion.component.css']
})
export class CrearLineaInvestigacionComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private service: LineaInvestigacionService
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
    let model = new Linea_InvestigacionModel();
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: Linea_InvestigacionModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-linea-investigacion"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se registro");
      }
    });

  }

}
