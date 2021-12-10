import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faUniversity, faPaste } from '@fortawesome/free-solid-svg-icons';
import { SolicitudModel } from '../../../../models/parametros/solicitud.model';
import { SolicitudService } from '../../../../servicios/parametros/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudProponenteService } from '../../../../servicios/parametros/solicitud-proponente.service';
import { ToastService } from '../../../../servicios/toast/toast.service';
import { GeneralData } from 'src/app/config/general-data';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {
  private subscription = new Subscription();

  idProponente?: number;

  solicitudes: SolicitudModel[] = [];

  terminoBusqueda?: string;

  faArrowLeft = faArrowLeft;
  faUniversity = faUniversity;
  faPaste = faPaste;

  constructor(
    private solicitudService: SolicitudService,
    private solicitudProponenteService: SolicitudProponenteService,
    private toastService: ToastService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerSolicitudes();
    
  
    this.idProponente = parseInt(this.route.snapshot.params["id"]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerSolicitudes() {
    this.solicitudService.GetRecordList().subscribe(solicitudes => {
      this.solicitudes = solicitudes;
    })
  }

  crearSolicitudProponente(idSolicitud: number) {
    const modalData: ModalData = {
      body: "¿Seguro que desea seleccionar la solicitud?",
      esModalConfirmacion: true
    }
    const modalSubscription = this.modalService.openModal(modalData)
      ?.subscribe(confirmacion => {
        if (confirmacion) {
          this.solicitudProponenteService.GuardarRegistroSolicitudProponente(idSolicitud, this.idProponente!)
            .subscribe({
              next: () => {
                this.toastService.openToast({ tipo: 'success', mensaje: GeneralData.TOAST_MENSAJE_CREACION("La solicitud") })
              },
              error: () => {
                this.toastService.openToast({ tipo: 'error', mensaje: GeneralData.TOAST_ERROR_CREACION("La solicitud") })
              }
            })

          this.router.navigateByUrl("/home");
        }
      })
    
    this.subscription.add(modalSubscription);
  }
}