import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';

import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { RecordatorioModel } from 'src/app/models/evaluacion/recordatorio.model';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { GeneralData } from '../../../../config/general-data';
import { FiltroBusquedaInvitacionesModel } from '../../../../models/evaluacion/filtro-busqueda-invitaciones.model';
import { RecordatorioService } from '../../../../servicios/evaluacion/recordatorio.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-invitacion-evaluar',
  templateUrl: './listar-invitacion-evaluar.component.html',
  styleUrls: ['./listar-invitacion-evaluar.component.css']
})
export class ListarInvitacionEvaluarComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  invitacionesEvaluar?: InvitacionEvaluarModel[];

  faArrowLeft = faArrowLeft;
  faCalendar = faCalendar;
  faCalendarCheck = faCalendarCheck;

  estadoInvitacionesFiltradas = 4; // El 4 significa que queremos todas las solicitudes

  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService,
    private toastService: ToastService,
    private modalService: ModalService,
    private recordatorioService: RecordatorioService,
  ) { }

  ngOnInit(): void {
    this.obtenerInvitacionesEvaluar();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerInvitacionesEvaluar(filtros: FiltroBusquedaInvitacionesModel = {}) {
    let { filtroEstadoEvaluacion, filtroEstadoInvitacion } = filtros
    if (!filtroEstadoEvaluacion) {
      filtroEstadoEvaluacion = `"where":{"and":[{"or":[{"estado_evaluacion":0},{"estado_evaluacion":1}]}`
    }

    const filtro = `${filtroEstadoEvaluacion}${filtroEstadoInvitacion ? `,${filtroEstadoInvitacion}]}` : "]}"}`;
    this.invitacionEvaluarService.GetRecordList(filtro)
      .subscribe({
        next: (invitacionesEvaluar) => {
          const invitacionesEvaluarDesordenadas = invitacionesEvaluar;
          this.invitacionesEvaluar = invitacionesEvaluarDesordenadas.sort((invitacionUno, invitacionDos) => {
            return new Date(invitacionDos.fecha_invitacion!).getTime() - new Date(invitacionUno.fecha_invitacion!).getTime()
          })
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA("las invitaciones a evaluar") })
        }
      })
  }

  filtarInvitaciones(): void {
    this.invitacionesEvaluar = undefined;

    if (this.estadoInvitacionesFiltradas != 4) {
      const filtros: FiltroBusquedaInvitacionesModel = {
        filtroEstadoInvitacion: `{"estado_invitacion":${this.estadoInvitacionesFiltradas}}`
      }
      this.obtenerInvitacionesEvaluar(filtros)

    } else {
      this.obtenerInvitacionesEvaluar()
    }
  }

  crearRecordatorio(idInvitacionEvaluar: number) {
    const recordatorio: RecordatorioModel = {
      id_invitacion_evaluar: idInvitacionEvaluar,
      fecha: new Date,
      hora: `${dayjs(new Date).get('hour') < 10 ? `0${dayjs(new Date).get('hour')}`: dayjs(new Date).get('hour')}:${dayjs(new Date).get('minute') < 10 ? `0${dayjs(new Date).get('minute')}`: dayjs(new Date).get('minute')}`,
      tipo_recordatorio: "Sencillo"
    }    

    const modalData: ModalData = {
      header: "Creación de recordatorio",
      body: "¿Está seguro que desea enviar el recordatorio?",
      esModalConfirmacion: true
    }    

    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (confirmacion) {
          this.recordatorioService.GuardarRegistro(recordatorio)
            .subscribe({
              next: (recordatorio) => {
                this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION("El recordatorio") })
              },
              error: (error: any) => {
                console.error(error);
                this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CREACION("El recordatorio") })
              }
            })
          }
      })
    
    this.subscription.add(modalSubscription);
  }

}
