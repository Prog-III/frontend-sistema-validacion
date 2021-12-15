import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultadoEvaluacionModel } from 'src/app/models/evaluacion/resultado-evaluacion.model';
import { ResultadoEvaluacionService } from '../../../../servicios/evaluacion/resultado-evaluacion.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { GeneralData } from 'src/app/config/general-data';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';

@Component({
  selector: 'app-detalles-evaluacion',
  templateUrl: './detalles-evaluacion.component.html',
  styleUrls: ['./detalles-evaluacion.component.css']
})
export class DetallesEvaluacionComponent implements OnInit {
  resultadoEvaluacion?: ResultadoEvaluacionModel;

  idResultado?: number;
  idSolicitud?: number;

  faArrowLeft = faArrowLeft;
  
  constructor(
    private route: ActivatedRoute,
    private resultadoEvaluacionService: ResultadoEvaluacionService,
    private invitacionEvaluarService: InvitacionEvaluarService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.idResultado = parseInt(this.route.snapshot.params['idResultadoEvaluacion']);

    this.obtenerSolicitud();
  }

  obtenerSolicitud(): void {
    this.resultadoEvaluacionService.BuscarRegistro(this.idResultado!)
      .subscribe({
        next: (resultadoEvaluacion) => {
          this.resultadoEvaluacion = resultadoEvaluacion
          this.invitacionEvaluarService.BuscarInvitacionPorId(resultadoEvaluacion.id_invitacion_evaluar!)
            .subscribe(invitacion => this.idSolicitud = invitacion.id_solicitud);
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA('la evaluación') })
        }
      })
  }

  descargarArchivo(id: string) {
    const url = `http://localhost:3000/descargar_archivos_azure/${id}`

    window.open(url);
  }

}
