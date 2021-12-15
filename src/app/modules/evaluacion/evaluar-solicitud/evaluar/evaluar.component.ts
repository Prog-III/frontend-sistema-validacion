import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudComiteService } from 'src/app/servicios/parametros/solicitud-comite.service';
import { SolicitudService } from 'src/app/servicios/parametros/solicitud.service';
import { faArrowLeft, faAsterisk, faUniversity, faPaste } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoEvaluacionModel } from 'src/app/models/evaluacion/resultado-evaluacion.model';
import * as dayjs from 'dayjs';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { ResultadoEvaluacionService } from 'src/app/servicios/evaluacion/resultado-evaluacion.service';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { GeneralData } from 'src/app/config/general-data';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from 'src/app/models/compartido/modal-data';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.component.html',
  styleUrls: ['./evaluar.component.css']
})
export class EvaluarComponent implements OnInit {

  idjurado = parseInt(this.route.snapshot.params["idjurado"])
  idsolicitud = parseInt(this.route.snapshot.params["idsolicitud"])
  solicitud: SolicitudModel = new SolicitudModel;
  comitesSolicitud: ComiteModel[] = []
  faArrowLeft = faArrowLeft
  faAsterisk = faAsterisk
  tiposolicitud: TipoSolicitudModel = new TipoSolicitudModel;
  formulario: FormGroup = new FormGroup({});

  constructor(
    private serviceSolicitud: SolicitudService,
    private servicecomiteSolicitud: SolicitudComiteService,
    private servicetipoSolicitud: TipoSolicitudService,
    private serviceInvitacionEvaluar: InvitacionEvaluarService,
    private serviceResultadoEvaluacion: ResultadoEvaluacionService,
    private route: ActivatedRoute,
    private cargaArchivos: CargaArchivosService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crearFormulario()
    this.obtenerSolicitud()
    this.obtenerComites()
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      descripcion: ['', [Validators.required]],
      formato: ['', [Validators.required]]
    })
  }

  CrearRegistro() {
    const modalData: ModalData = {
      header: "Registrar evaluación",
      body: "¿Está seguro que desea registrar la evaluación?",
      esModalConfirmacion: true
    }

    this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (!confirmacion) return;
        
        const formData = new FormData();
        formData.append('file', this.formulario.get('formato')?.value);


        let model = new ResultadoEvaluacionModel();
        model.descripcion = this.formulario.controls['descripcion'].value;
        model.fecha = dayjs().format('YYYY-MM-DD HH:mm:ss');

        this.serviceInvitacionEvaluar.BuscarRegistroPorIdJuradoIdSolicitud(this.idjurado, this.idsolicitud).subscribe({
          next: (data: InvitacionEvaluarModel[]) => {

            model.id_invitacion_evaluar = data[0].id

            this.cargaArchivos.GuardarRegistro(this.formulario.get('formato')?.value).subscribe({
              next: (data: any) => {
                model.formato_diligenciado = data.name;
                this.serviceResultadoEvaluacion.GuardarRegistro(model).subscribe({
                  next: (data: ResultadoEvaluacionModel) => {
                    const mensajeToast: ToastData = {
                      tipo: 'success',
                      mensaje: GeneralData.TOAST_MENSAJE_CREACION('El resultado de la evaluación')
                    }
                    this.toastService.openToast(mensajeToast);
                    this.router.navigate(["/home"]);
                  },
                  error: (err: any) => {
                    const mensajeToast: ToastData = {
                      tipo: 'error',
                      mensaje: GeneralData.TOAST_ERROR_CREACION('El resultado de la evaluación')
                    }
                    this.toastService.openToast(mensajeToast);
                  }
                });
              },

            });

          }

        });
      })
  }


  obtenerSolicitud() {
    this.serviceSolicitud.BuscarRegistro(this.idsolicitud).subscribe({
      next: (data: SolicitudModel) => {
        if (data)
          this.solicitud = data
        this.servicetipoSolicitud.BuscarRegistro(this.solicitud.id_tipo_solicitud).subscribe({
          next: (data: TipoSolicitudModel) => {
            if (data)
              this.tiposolicitud = data
            console.log(this.tiposolicitud);

          },
          error: (err: any) => {

          }
        })
      },
      error: (err: any) => {

      }
    })
  }

  obtenerComites() {
    this.servicecomiteSolicitud.ObtenerComitesPorSolicitud(this.idsolicitud).subscribe({
      next: (data: ComiteModel[]) => {
        if (data)
          this.comitesSolicitud = data

      },
      error: (err: any) => {

      }
    })
  }



  descarga(id: any) {

    let url = 'http://localhost:3000/descargar_archivos_azure/' + id;

    window.open(url);

  }

  onChangeImageFile(event: any) {
    if (event.target.value) {


      this.formulario.get('formato')?.setValue(event.target.files[0]);


    }
  }
}
