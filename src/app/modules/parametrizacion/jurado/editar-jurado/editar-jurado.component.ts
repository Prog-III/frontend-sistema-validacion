import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { LineaInvestigacionService } from '../../../../servicios/parametros/linea-investigacion.service';
import { existeArregloValidator } from '../../../../validators/existeArreglo.validator';
import { JuradoLineaInvestigacionService } from '../../../../servicios/parametros/jurado-linea-investigacion.service';
import { JuradoLineaInvestigacionModel } from '../../../../models/parametros/jurado-linea-investigacion.model';

@Component({
  selector: 'app-editar-jurado',
  templateUrl: './editar-jurado.component.html',
  styleUrls: ['./editar-jurado.component.css']
})
export class EditarJuradoComponent implements OnInit {
  formulario?: FormGroup;

  lineasInvestigacionOptions: LineaInvestigacionModel[] = [];
  lineasInvestigacionSeleccionadas: LineaInvestigacionModel[] = [];
  private juradoId?: number;

  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private juradoService: JuradoService,
    private lineaInvestigacionService: LineaInvestigacionService,
    private juradoLineaInvestigacionService: JuradoLineaInvestigacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.juradoId = parseInt(this.route.snapshot.params["id"]);

    this.GetLineasInvestigacion().subscribe(lineasInvestigacion => {
      this.lineasInvestigacionOptions = lineasInvestigacion;

      this.juradoLineaInvestigacionService.ObtenerLineasInvestigacionPorJurado(this.juradoId!)
        .subscribe(data => {
          this.lineasInvestigacionSeleccionadas = data;

          this.BuscarRegistro();
          this.crearFormulario();
        })
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      entidad: ['', [Validators.required]],
      lineasInvestigacion: ['']
    }, { validators: existeArregloValidator(this.lineasInvestigacionSeleccionadas) });
  }

  GetLineasInvestigacion() {
    return this.lineaInvestigacionService.GetRecordList();
  }

  BuscarRegistro() {
    this.juradoService.BuscarRegistro(this.juradoId!).subscribe({
      next: (data: JuradoModel) => {
        this.formulario?.controls["nombre"].setValue(data.nombre)
        this.formulario?.controls["email"].setValue(data.email)
        this.formulario?.controls["telefono"].setValue(data.telefono)
        this.formulario?.controls["entidad"].setValue(data.entidad)
      }
    });
  }

  CrearRegistro() {
    let model = new JuradoModel();
    model.id = this.juradoId;
    model.nombre = this.formulario?.controls['nombre'].value;
    model.email = this.formulario?.controls['email'].value;
    model.telefono = this.formulario?.controls['telefono'].value;
    model.entidad = this.formulario?.controls['entidad'].value;

    this.juradoService.EditarRegistro(model).subscribe({
      next: (data: JuradoModel) => {
        let idsLineaInvestigacion = this.lineasInvestigacionSeleccionadas.map(linea => linea.id!);

        this.juradoLineaInvestigacionService.ObtenerLineasInvestigacionPorJurado(this.juradoId!)
          .subscribe(lineasInvestigacion => {
            const lineasInvestigacionAComparar = lineasInvestigacion.map(linea => linea.id);

            lineasInvestigacionAComparar.forEach(linea => {
              if (!idsLineaInvestigacion.includes(linea!)) {
                const juradoLineaInvestigacion: JuradoLineaInvestigacionModel = {
                  id_jurado: this.juradoId!,
                  id_linea_investigacion: linea
                }

                this.juradoLineaInvestigacionService.EliminarJuradosLineasInvestigacion(juradoLineaInvestigacion)
                  .subscribe(data => { })

                idsLineaInvestigacion = idsLineaInvestigacion.filter(lineaId => lineaId !== linea);
              }
            });

            this.juradoLineaInvestigacionService.GuardarRegistroLineasInvestigacionJurado(idsLineaInvestigacion, this.juradoId!)
              .subscribe(data => {
                //aqui va el modal
                console.log("Se guardo el mensaje");
                this.router.navigate(["/parametrizacion/listar-jurado"]);
              });
          })
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });
  }

  resetearSelect(controlName: string) {
    let lineaInvestigacion = this.formulario?.get(controlName)?.value;
    lineaInvestigacion = JSON.parse(lineaInvestigacion) as LineaInvestigacionModel;

    const elementoYaExistente = this.lineasInvestigacionSeleccionadas.some(linea => linea.id === lineaInvestigacion.id);

    if (!elementoYaExistente) {
      this.lineasInvestigacionSeleccionadas.push(lineaInvestigacion);
    }

    this.formulario?.get(controlName)?.setValue("");
  }

  eliminarElementoArreglo(indice: number) {
    this.lineasInvestigacionSeleccionadas.splice(indice, 1);

    this.formulario?.get('lineasInvestigacion')?.setValue("");
  }


}
