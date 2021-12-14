import { Component, OnInit } from '@angular/core';
import { faCalendar, faArrowLeft, faClock } from '@fortawesome/free-solid-svg-icons';
import { RecordatorioModel } from '../../../../models/evaluacion/recordatorio.model';
import { RecordatorioService } from '../../../../servicios/evaluacion/recordatorio.service';
import { firstValueFrom, map, filter } from 'rxjs';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';

import filterAsync from 'node-filter-async';
import { RecordatorioResumidoModel } from '../../../../models/evaluacion/recordatorio-resumido.model';

@Component({
  selector: 'app-listar-recordatorio',
  templateUrl: './listar-recordatorio.component.html',
  styleUrls: ['./listar-recordatorio.component.css']
})
export class ListarRecordatorioComponent implements OnInit {

  recordatorios?: RecordatorioResumidoModel[];

  faCalendar = faCalendar;
  faArrowLeft = faArrowLeft;
  faClock = faClock;

  constructor(
    private recordatorioService: RecordatorioService,
    private invitacionEvaluarService: InvitacionEvaluarService
  ) { }

  ngOnInit(): void {
    this.obtenerRecordatorios();
  }
  
  /**
   * 
   */
  obtenerRecordatorios(): void {
    this.recordatorioService.GetRecordList()
      .pipe(
        map(recordatorios => {
          return recordatorios.filter(recordatorio => recordatorio.tipo_recordatorio?.toUpperCase() === 'SENCILLO')
        }),
        map(recordatorios => {
          const recordatoriosOrdenados = recordatorios.sort((recordatorioUno, recordatorioDos) => {
            return new Date(recordatorioDos.fecha!).getTime() - new Date(recordatorioUno.fecha!).getTime()
          })

          const recordatoriosResumidos: RecordatorioResumidoModel[] = [];
          recordatoriosOrdenados.forEach(recordatorio => {
            const indexRecordatorioResumido = recordatoriosResumidos.findIndex(elemento => elemento.id_invitacion_evaluar === recordatorio.id_invitacion_evaluar);

            if (indexRecordatorioResumido === -1) {
              return recordatoriosResumidos.push({
                id: recordatorio.id,
                id_invitacion_evaluar: recordatorio.id_invitacion_evaluar,
                ultima_fecha: recordatorio.fecha,
                ultima_hora: recordatorio.hora,
                cantidad_recordatorios: 1
              })
            }

            return recordatoriosResumidos[indexRecordatorioResumido].cantidad_recordatorios! += 1;
          })
          
          return recordatoriosResumidos;
        }),
        map(async (recordatorios) => {
          const recordatoriosFiltrados = await filterAsync(recordatorios, async (recordatorio) => {
            const invitacionEvaluar = await firstValueFrom(this.invitacionEvaluarService.BuscarInvitacionPorId(recordatorio.id_invitacion_evaluar!))

            return (invitacionEvaluar && invitacionEvaluar.estado_invitacion === 1 && invitacionEvaluar.estado_evaluacion === 1);
          })

          return recordatoriosFiltrados;
        }),
      )
      .subscribe(async (recordatorios) => {
        this.recordatorios = await recordatorios;
      })
  }
  

}
