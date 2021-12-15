import { Component, OnInit } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { ResultadoEvaluacionModel } from 'src/app/models/evaluacion/resultado-evaluacion.model';
import { ResultadoEvaluacionJuradoModel } from 'src/app/models/evaluacion/resultado-evaluacion-jurado.model';

@Component({
  selector: 'app-listar-resultado-evaluacion',
  templateUrl: './listar-resultado-evaluacion.component.html',
  styleUrls: ['./listar-resultado-evaluacion.component.css']
})
export class ListarResultadoEvaluacionComponent implements OnInit {
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
          console.log(this.invitacionesEvaluar);
          

          /**
           * 
           */
          this.resultadosEvaluacion = await Promise.all(this.invitacionesEvaluar.map(async (invitacion): Promise<ResultadoEvaluacionJuradoModel> => {
            const resultadoEvaluacion = await
             firstValueFrom(this.resultadoEvaluacionService.BuscarRegistroPorIdInvitacion(invitacion.id!)) as ResultadoEvaluacionJuradoModel;
          
            resultadoEvaluacion.id_jurado = invitacion.id_jurado;

            return resultadoEvaluacion;
          }))      

          console.log(this.resultadosEvaluacion);
        }
      });
  }

}
