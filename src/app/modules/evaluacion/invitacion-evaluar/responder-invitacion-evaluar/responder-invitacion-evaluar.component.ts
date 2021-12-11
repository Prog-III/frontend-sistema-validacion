import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { InvitacionEvaluarService } from '../../../../servicios/evaluacion/invitacion-evaluar.service';
import { RespuestaInvitacionModel } from '../../../../models/evaluacion/respuesta-invitacion.model';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-responder-invitacion-evaluar',
  templateUrl: './responder-invitacion-evaluar.component.html',
  styleUrls: ['./responder-invitacion-evaluar.component.css']
})
export class ResponderInvitacionEvaluarComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  formularioRespuesta: FormGroup = new FormGroup({});
  hashInvitacion?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private toastService: ToastService,
    private invitacionEvaluarService: InvitacionEvaluarService
  ) { }

  ngOnInit(): void {
    this.hashInvitacion = this.route.snapshot.params['hash'];
    this.inicializarFormulario();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inicializarFormulario(): void {
    this.formularioRespuesta = this.fb.group({
      respuesta_invitacion: ['', Validators.required],
      observaciones: ['']
    })
  }

  subirRespuesta(): void {
    const modalData: ModalData = {
      header: "Responder solicitud",
      body: "¿Está seguro que desea responder la solicitud?",
      esModalConfirmacion: true
    };

    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (confirmacion) {
          const respuestaInvitacion: RespuestaInvitacionModel = {
            nuevoEstado: parseInt(this.formularioRespuesta.get("respuesta_invitacion")?.value),
            observaciones: this.formularioRespuesta.get("respuesta_invitacion")?.value
          }

          this.invitacionEvaluarService.ActualizarInvitacionPorHash(this.hashInvitacion!, respuestaInvitacion).subscribe({
            next: () => {
              this.toastService.openToast({ tipo: 'success', mensaje: "Invitación respondida, recibirá una notificación en su correo electrónico" });
              this.router.navigateByUrl("/seguridad/login");
            },
            error: (error: any) => {
              console.error(error);
              this.toastService.openToast({ tipo: 'error', mensaje: "Hubo un error inesperado. Intente nuevamente" });
            }
          })
        }
      })
    
    this.subscription.add(modalSubscription);
  }
}
