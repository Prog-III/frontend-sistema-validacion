import { Component, OnInit, OnDestroy } from '@angular/core';
import { JuradoService } from '../../../../servicios/parametros/jurado.service';
import { JuradoModel } from '../../../../models/parametros/jurado.model';

import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-crear-invitacion-evaluar',
  templateUrl: './crear-invitacion-evaluar.component.html',
  styleUrls: ['./crear-invitacion-evaluar.component.css']
})
export class CrearInvitacionEvaluarComponent implements OnInit, OnDestroy {

  jurados?: JuradoModel[];

  idSolicitud?: number;

  terminoBusqueda?: string;

  faUniversity = faUniversity;
  faEnvelope = faEnvelope;
  faMobileAlt = faMobileAlt;
  faArrowLeft = faArrowLeft;

  private subscription = new Subscription();

  constructor(
    private juradoService: JuradoService,
    private invitacionEvaluarService: InvitacionEvaluarService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.obtenerJurados();
    this.idSolicitud = parseInt(this.route.snapshot.params["id"]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerJurados() : void {
    this.juradoService.GetRecordList().subscribe(jurados => {
      this.invitacionEvaluarService.GetRecordList().subscribe(invitacionesEvaluar => {
        const juradosInvitadosASolicitud = invitacionesEvaluar.filter(invitacion => invitacion.id_solicitud === this.idSolicitud)
        const idJuradosInvitados = juradosInvitadosASolicitud.map(invitacion => invitacion.id_jurado);

        this.jurados = jurados.filter(jurado => !idJuradosInvitados.includes(jurado.id))
      })
    })
  };

  crearInvitacionEvaluar(idJurado: number) {
    const mensajeModal: ModalData = {
      header: "Selección de jurado",
      body: "¿Seguro que quiere elegir al jurado?",
      esModalConfirmacion: true
    }

    const respuestaModal = this.modalService.openModal(mensajeModal)
      ?.subscribe(confirmacion => {
        if (confirmacion) {
          const nuevaInvitacionEvaluar: InvitacionEvaluarModel = {
            id_solicitud: this.idSolicitud,
            id_jurado: idJurado,
            fecha_invitacion: `${new Date}`,
            estado_invitacion: 0,
            estado_evaluacion: 0
          }

          this.invitacionEvaluarService.GuardarRegistro(nuevaInvitacionEvaluar)
            .subscribe({
              next: (invitacionCreada) => {
                this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION("La invitación") })
                this.router.navigateByUrl('/evaluacion/listar-invitacion-evaluar')
              },
              error: (error) => {
                console.error(error);
                this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CREACION("La invitación") })
              }
            })
        }
      })
    
    this.subscription.add(respuestaModal);
  }
}
