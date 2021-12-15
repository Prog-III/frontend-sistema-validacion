import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';
import { SolicitudService } from '../../../../servicios/parametros/solicitud.service';
import { ResultadoEvaluacionService } from '../../../../servicios/evaluacion/resultado-evaluacion.service';
import { SolicitudModel } from '../../../../models/parametros/solicitud.model';
import { ComiteModel } from '../../../../models/parametros/comite.model';
import { ComiteService } from '../../../../servicios/parametros/comite.service';
import { SolicitudComiteService } from '../../../../servicios/parametros/solicitud-comite.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { ResultadoEvaluacionModel } from 'src/app/models/evaluacion/resultado-evaluacion.model';
import { ResultadoEvaluacionJuradoModel } from 'src/app/models/evaluacion/resultado-evaluacion-jurado.model';
import { ModalData } from '../../../../models/compartido/modal-data';

@Component({
  selector: 'app-listar-resultado-evaluacion',
  templateUrl: './listar-resultado-evaluacion.component.html',
  styleUrls: ['./listar-resultado-evaluacion.component.css']
})
export class ListarResultadoEvaluacionComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  idSolicitud?: number;

  solicitud?: SolicitudModel;
  comites?: ComiteModel[];

  invitacionesEvaluar?: InvitacionEvaluarModel[];
  resultadosEvaluacion?: ResultadoEvaluacionJuradoModel[];

  faArrowLeft = faArrowLeft;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService,
    private invitacionEvaluarService: InvitacionEvaluarService,
    private solicitudService: SolicitudService,
    private solicitudComiteService: SolicitudComiteService,
    private resultadoEvaluacionService: ResultadoEvaluacionService
  ) { }

  ngOnInit(): void {
    this.idSolicitud = parseInt(this.route.snapshot.params['idSolicitud']);

    this.obtenerSolicitud();
    this.obtenerResultadosEvaluacion();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerSolicitud(): void {
    this.solicitudService.BuscarRegistro(this.idSolicitud)
      .subscribe({
        next: async (solicitud) => {
          this.solicitud = solicitud;
          this.comites = await firstValueFrom(this.solicitudComiteService.ObtenerComitesPorSolicitud(this.idSolicitud!));          
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA('la solicitud') })
        }
      })
  }

  obtenerResultadosEvaluacion(): void {
    const filtro = `"where":{"id_solicitud":${this.idSolicitud}}`;
    this.invitacionEvaluarService.GetRecordList(filtro)
      .subscribe({
        next: async (invitacionesEvaluar) => {
          this.invitacionesEvaluar = invitacionesEvaluar;

          /**
           * 
           */
          const resultadosEvaluacionSinFiltrar = await Promise.all(this.invitacionesEvaluar.map(async (invitacion): Promise<ResultadoEvaluacionJuradoModel | undefined> => {
            let resultadoEvaluacion = await
             firstValueFrom(this.resultadoEvaluacionService.BuscarRegistroPorIdInvitacion(invitacion.id!));             
                         
            if (resultadoEvaluacion[0]) {              
              const resultadoConIdJurado: ResultadoEvaluacionJuradoModel = {
                ...resultadoEvaluacion[0],
                id_jurado: invitacion.id_jurado
              }
  
              return resultadoConIdJurado;
            }

            return undefined;
          }))

          this.resultadosEvaluacion = resultadosEvaluacionSinFiltrar.filter(resultado => resultado !== undefined) as ResultadoEvaluacionJuradoModel[];
        }
      });
  }

  eliminarEvaluacion(idEvaluacion: number) {
    const modalData: ModalData = {
      header: "Eliminación de evaluación",
      body: "¿Está seguro de que desea eliminar la evaluación?",
      esModalConfirmacion: true
    }

    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (!confirmacion) return;
        
        this.resultadoEvaluacionService.EliminarRegistro(idEvaluacion)
          .subscribe({
            next: (resultadoEvaluacion) => {
              this.recargarComponente();
              this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION("La evaluación") });
            },
            error: (error: any) => {
              console.error(error);
              this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_ELIMINACION("La evaluación") })
            } 
          })
      })
    
    this.subscription.add(modalSubscription);
  }

  recargarComponente() {
    const urlActual = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([urlActual]);
  }

  marcarSolicitudComoAsignada(solicitud: SolicitudModel) {
    const modalData: ModalData = {
      header: 'Asignación de solicitud',
      body: '¿Está seguro que desea pasar esta solicitud a estado asignado?',
      esModalConfirmacion: true
    };

    console.log();
    

    const solicitudAGuardar = solicitud;
    solicitudAGuardar.id_estado = 3;

    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (!confirmacion) return;

        this.solicitudService.EditarRegistro(solicitudAGuardar)
          .subscribe({
            next: () => {
              this.toastService.openToast({ tipo: 'success', mensaje: 'La solicitud se ha asignado correctamente' });
              this.router.navigate(['/solicitud', 'listar-solicitud'], { queryParams: { filtro: 'asignadas' } })
            },
            error: (error: any) => {
              console.error(error);
              this.toastService.openToast({ tipo: 'error', mensaje: 'Error al asignar la solicitud. Intente nuevamente' });
            }
          })
      })
    
    this.subscription.add(modalSubscription);
  }

}
