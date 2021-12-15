import { Component, OnInit } from '@angular/core';
import { RecordatorioModel } from 'src/app/models/evaluacion/recordatorio.model';
import { RecordatorioService } from '../../../../servicios/evaluacion/recordatorio.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ActivatedRoute, Router } from '@angular/router';

import { faAsterisk, faArrowLeft, faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resumen-recordatorio',
  templateUrl: './resumen-recordatorio.component.html',
  styleUrls: ['./resumen-recordatorio.component.css']
})
export class ResumenRecordatorioComponent implements OnInit {
  private subscription = new Subscription();

  idInvitacionEvaluar?: number;

  recordatorios?: RecordatorioModel[];

  faArrowLeft = faArrowLeft;
  faCalendar = faCalendar;
  faClock = faClock;
  faAsterisk = faAsterisk;

  paginaActual = 1;
  totalRecordatorios?: number;

  formularioDeRecordatorio: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordatorioService: RecordatorioService,
    private toastService: ToastService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.idInvitacionEvaluar = parseInt(this.route.snapshot.params['idInvitacionEvaluar']);
    this.obtenerRecordatorios();

    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formularioDeRecordatorio = this.fb.group({
      fechaLlamada: ['', [Validators.required]],
      horaLlamada: ['', [Validators.required]],
      motivoLlamada: ['', [Validators.required]]
    })
  }

  obtenerRecordatorios(): void {
    const filtroRecordatorios =`"where":{"id_invitacion_evaluar":${this.idInvitacionEvaluar}}`
    this.recordatorioService.GetRecordList(filtroRecordatorios)
      .subscribe({
        next: recordatorios => {
          this.recordatorios = recordatorios.sort((recordatorioUno, recordatorioDos) => {
            return new Date(recordatorioDos.fecha!).getTime() - new Date(recordatorioUno.fecha!).getTime()
          })

          this.totalRecordatorios = this.recordatorios.length;
        },
        error: (error: any) => {
          console.error(error);
          this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CARGA("los recordatorios") })
        }
      })
  }

  crearRecordatorio() {
    const modalData: ModalData = {
      header: "Creación de recordatorio",
      body: "¿Está seguro de crear el recordatorio?",
      esModalConfirmacion: true
    }

    console.log(this.formularioDeRecordatorio.get('fechaLlamada')?.value);
    
    let fechaLlamada = new Date(this.formularioDeRecordatorio.get('fechaLlamada')?.value);    
    const horaLlamada = this.formularioDeRecordatorio.get('horaLlamada')?.value as string;
    const motivoLlamada = this.formularioDeRecordatorio.get('motivoLlamada')?.value;

    const [horas, minutos] = horaLlamada.split(':');
    fechaLlamada.setDate(fechaLlamada.getDate() + 1);
    fechaLlamada.setHours(parseInt(horas));
    fechaLlamada.setMinutes(parseInt(minutos));
    
    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (confirmacion) {
          const objetoRecordatorio: RecordatorioModel = {
            tipo_recordatorio: "Extendido",
            fecha: fechaLlamada,
            hora: horaLlamada,
            descripcion: motivoLlamada,
            id_invitacion_evaluar: this.idInvitacionEvaluar
          }          

          this.recordatorioService.GuardarRegistro(objetoRecordatorio)
            .subscribe({
              next: () => {
                this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION('El recordatorio') });
                this.router.navigateByUrl('evaluacion/listar-recordatorio');
              },
              error: (error: any) => {
                console.error(error);
                this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CREACION('El recordatorio') })
              }
            })
        }
      })
    
    this.subscription.add(modalSubscription);
  }

  mostrarDescripcion(descripcion: string): void {
    this.modalService.openModal({ header: 'Descripción recordatorio', body: descripcion })
  }

}
