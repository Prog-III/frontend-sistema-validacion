import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

import { map } from 'rxjs';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/servicios/evaluacion/invitacion-evaluar.service';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { GeneralData } from '../../../../config/general-data';

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

  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.obtenerInvitacionesEvaluar();
  }

  obtenerInvitacionesEvaluar() {
    const filtro = `"where":{"or":[{"estado_evaluacion":0},{"estado_evaluacion":1}]}`

    this.invitacionEvaluarService.GetRecordList(filtro)
      .subscribe({
        next: (invitacionesEvaluar) => {
          this.invitacionesEvaluar = invitacionesEvaluar;
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA("las invitaciones a evaluar") })
        }
      })
  }

}
