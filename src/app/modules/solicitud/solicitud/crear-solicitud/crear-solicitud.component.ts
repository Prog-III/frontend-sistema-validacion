import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { GeneralData } from 'src/app/config/general-data';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion.service';
import { ModalidadService } from 'src/app/servicios/parametros/modalidad.service';
import { ProponenteDepartamentoService } from 'src/app/servicios/parametros/proponente-departamento.service';
import { SolicitudComiteService } from 'src/app/servicios/parametros/solicitud-comite.service';
import { SolicitudProponenteService } from 'src/app/servicios/parametros/solicitud-proponente.service';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { existeArregloValidator } from '../../../../validators/existeArreglo.validator';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {
  idProponente?: number;

  lineaList: LineaInvestigacionModel[] = [];
  tipoList: TipoSolicitudModel[] = [];
  modalidadList: ModalidadModel[] = [];
  comiteList: ComiteModel[] = [];

  comitesSeleccionados: ComiteModel[] = [];

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private service: SolicitudService,
    private serviceLinea: LineaInvestigacionService,
    private serviceTipo: TipoSolicitudService,
    private serviceModalidad: ModalidadService,
    private serviceComite: ComiteService,
    private cargaArchivos: CargaArchivosService,
    private proponenteDepartamentoService: ProponenteDepartamentoService,
    private solicitudComiteService: SolicitudComiteService,
    private solicitudProponenteService: SolicitudProponenteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.GetLineaList();
    this.GetTipoList();
    this.GetModalidadList();
    this.GetComiteList();

    this.idProponente = parseInt(this.route.snapshot.params["id"]);
    this.verificarProponenteExiste(this.idProponente);
  }
  verificarProponenteExiste(id: number){
    this.proponenteDepartamentoService.obtenerProponente(id).subscribe((data)=>{
      //console.log("existe el proponente");
    },
    (err)=>{
      console.log("no existe el proponente");
      this.router.navigate(["/home"]);
    })
  }

  GetLineaList() {
    this.serviceLinea.GetRecordList().subscribe({
      next: (data: LineaInvestigacionModel[]) => {
        this.lineaList = data;
      }
    })
  }

  GetTipoList() {
    this.serviceTipo.GetRecordList().subscribe({
      next: (data: TipoSolicitudModel[]) => {
        this.tipoList = data;
      }
    })
  }

  GetModalidadList() {
    this.serviceModalidad.GetRecordList().subscribe({
      next: (data: ModalidadModel[]) => {
        this.modalidadList = data;
      }
    })
  }

  GetComiteList() {
    this.serviceComite.GetRecordList().subscribe({
      next: (data: ComiteModel[]) => {
        this.comiteList = data;
      }
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre_trabajo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      id_linea_investigacion: ['', [Validators.required]],
      id_tipo_solicitud: ['', [Validators.required]],
      id_modalidad: ['', [Validators.required]],
      id_estado: [1, [Validators.required]],
      comites: ['']
    }, { validators: existeArregloValidator(this.comitesSeleccionados) });
  }

  CrearRegistro() {
    const formData = new FormData();
    formData.append('file', this.formulario.get('archivo')?.value);

    let model = new SolicitudModel();
    model.fecha = dayjs().format('YYYY-MM-DD HH:mm:ss');
    model.nombre_trabajo = this.formulario.controls['nombre_trabajo'].value;
    model.descripcion = this.formulario.controls['descripcion'].value;
    model.id_linea_investigacion = parseInt(this.formulario.controls['id_linea_investigacion'].value);
    model.id_tipo_solicitud = parseInt(this.formulario.controls['id_tipo_solicitud'].value);
    model.id_modalidad = parseInt(this.formulario.controls['id_modalidad'].value);
    model.id_estado = this.formulario.controls['id_estado'].value


    this.cargaArchivos.GuardarRegistro(this.formulario.get('archivo')?.value).subscribe({
      next: (data) => {
        model.archivo = data.name;
        this.service.GuardarRegistro(model).subscribe({
          next: (data: SolicitudModel) => {

            this.comitesSeleccionados.forEach(comite => {
              this.solicitudComiteService.GuardarRegistroSolicitudComite(data.id!, comite.id!)
                .subscribe(data => { });
            })

            this.solicitudProponenteService.GuardarRegistroSolicitudProponente(data.id!, this.idProponente!)
              .subscribe(data => { })

            this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION("La solicitud") })
            this.router.navigate(["/home"]);
          },
          error: () => {
            this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CREACION("La solicitud") })
          }
        });
      },
      error: () => {
        this.toastService.openToast({ tipo: 'error', mensaje: "Hubo un error al subir la imagen" });
      }
    });
  }

  resetearSelect() {
    let comiteSeleccionado = this.formulario.get('comites')?.value;
    comiteSeleccionado = JSON.parse(comiteSeleccionado) as ComiteModel;

    const comiteYaSeleccionado = this.comitesSeleccionados.some(comite => comite.id === comiteSeleccionado.id);

    if (!comiteYaSeleccionado) {
      this.comitesSeleccionados.push(comiteSeleccionado);
    }

    this.formulario.get('comites')?.setValue("");
  }

  eliminarElementoArreglo(indice: number) {
    this.comitesSeleccionados.splice(indice, 1);

    this.formulario.get('comites')?.setValue("");
  }

  onChangeImageFile(event: any) {
    if (event.target.value) {
      this.formulario.get('archivo')?.setValue(event.target.files[0]);
    }
  }

}
