import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { GeneralData } from '../../../../config/general-data';
import { FiltroBusquedaInvitacionesModel } from '../../../../models/evaluacion/filtro-busqueda-invitaciones.model';

@Component({
  selector: 'app-listar-invitacion-evaluar',
  templateUrl: './listar-invitacion-evaluar.component.html',
  styleUrls: ['./listar-invitacion-evaluar.component.css']
})
export class ListarInvitacionEvaluarComponent implements OnInit {
  invitacionesEvaluar?: InvitacionEvaluarModel[];

  faArrowLeft = faArrowLeft;
  faCalendar = faCalendar;
  faCalendarCheck = faCalendarCheck;

  estadoInvitacionesFiltradas = 4; // El 4 significa que queremos todas las solicitudes

  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.obtenerInvitacionesEvaluar();
  }

  obtenerInvitacionesEvaluar(filtros: FiltroBusquedaInvitacionesModel = { }) {
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

}
