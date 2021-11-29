import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';

import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { LineaInvestigacionService } from '../../../../servicios/parametros/linea-investigacion.service';

import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { LineaInvestigacionModel } from '../../../../models/parametros/linea_investigacion.model';

import { existeArregloValidator } from '../../../../validators/existeArreglo.validator';
import { JuradoLineaInvestigacionService } from '../../../../servicios/parametros/jurado-linea-investigacion.service';
import { ValidadoresService } from '../../../../servicios/compartidos/validadores.service';

@Component({
  selector: 'app-crear-jurado',
  templateUrl: './crear-jurado.component.html',
  styleUrls: ['./crear-jurado.component.css']
})
export class CrearJuradoComponent implements OnInit { 
  formulario: FormGroup = new FormGroup({});

  lineasInvestigacionOptions: LineaInvestigacionModel[] = [];
  lineasInvestigacionSeleccionadas: LineaInvestigacionModel[] = [];

  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private juradoService: JuradoService,
    private lineaInvestigacionService: LineaInvestigacionService,
    private juradoLineaInvestigacionService: JuradoLineaInvestigacionService,
    private validadoresService: ValidadoresService
  ) { 

  }

  ngOnInit(): void {
    this.lineasInvestigacionSeleccionadas = [];

    this.GetLineasInvestigacion();
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.validadoresService.existeEmailJurado()]],
      telefono: [''],
      entidad: ['', [Validators.required]],
      lineasInvestigacion: ['']
    }, { validators: existeArregloValidator(this.lineasInvestigacionSeleccionadas) });
  }

  GetLineasInvestigacion() {
    this.lineaInvestigacionService.GetRecordList().subscribe(lineasInvestigacion => {
      this.lineasInvestigacionOptions = lineasInvestigacion;
    });
  }

  CrearRegistro() {
    let model = new JuradoModel();

    model.nombre = this.formulario.controls['nombre'].value;
    model.email = this.formulario.controls['email'].value;
    model.telefono = this.formulario.controls['telefono'].value;
    model.entidad = this.formulario.controls['entidad'].value;

    this.juradoService.GuardarRegistro(model).subscribe({
      next: (data: JuradoModel) => {
        //aqui va el modal
        const idsLineasInvestigacion = this.lineasInvestigacionSeleccionadas.map(linea => linea.id as number);

        this.juradoLineaInvestigacionService.GuardarRegistroLineasInvestigacionJurado(idsLineasInvestigacion, data.id!)
          .subscribe(data => console.log(data))

        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-jurado"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }

  resetearSelect(controlName: string) {
    let lineaInvestigacion = this.formulario.get(controlName)?.value;
    lineaInvestigacion = JSON.parse(lineaInvestigacion) as LineaInvestigacionModel;

    const elementoYaExistente = this.lineasInvestigacionSeleccionadas.some(linea => linea.id === lineaInvestigacion.id);
    
    if (!elementoYaExistente) {
      this.lineasInvestigacionSeleccionadas.push(lineaInvestigacion);
    }
    console.log(this.formulario);
    
    this.formulario.get(controlName)?.setValue("");
  }

  eliminarElementoArreglo(indice: number) {
    this.lineasInvestigacionSeleccionadas.splice(indice, 1);

    this.formulario.get('lineasInvestigacion')?.setValue("");
  }

  get emailControl() {
    return this.formulario.get('email');
  }
}
