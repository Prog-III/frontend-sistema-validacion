import { Component, OnInit } from '@angular/core';
import { JuradoService } from '../../../../servicios/parametros/jurado.service';
import { JuradoModel } from '../../../../models/parametros/jurado.model';

import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ActivatedRoute } from '@angular/router';
import { InvitacionEvaluarModel } from 'src/app/models/evaluacion/invitacion-evaluar.model';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-invitacion-evaluar',
  templateUrl: './crear-invitacion-evaluar.component.html',
  styleUrls: ['./crear-invitacion-evaluar.component.css']
})
export class CrearInvitacionEvaluarComponent implements OnInit {

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
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.obtenerJurados();
    this.idSolicitud = parseInt(this.route.snapshot.params["id"]);

  }

  obtenerJurados() : void {
    this.juradoService.GetRecordList().subscribe(jurados => {
      this.jurados = jurados;
    });
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
                console.log(invitacionCreada);
              },
              error: (error) => {
                console.error(error);
                
              }
            })
        }
      })
    
    this.subscription.add(respuestaModal);
  }
}
