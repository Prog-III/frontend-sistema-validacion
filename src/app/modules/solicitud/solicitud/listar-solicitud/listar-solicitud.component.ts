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
import { filter, Subscription, map } from 'rxjs';
import { ProponenteDepartamentoService } from 'src/app/servicios/parametros/proponente-departamento.service';
@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit {
  private subscription = new Subscription();

  idProponente?: number;

  filtro?: number;

  solicitudes: SolicitudModel[] = [];

  terminoBusqueda?: string;

  faArrowLeft = faArrowLeft;
  faUniversity = faUniversity;
  faPaste = faPaste;

  constructor(
    private solicitudService: SolicitudService,
    private solicitudProponenteService: SolicitudProponenteService,
    private toastService: ToastService,
    private proponenteDepartamentoService: ProponenteDepartamentoService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    const querySubscription = this.route.queryParams
      .pipe(
        map(params => params['filtro'])
      )
      .subscribe(filtroParam => {
        if (filtroParam === 'registradas') {
          this.filtro = 1;
        } else if (filtroParam === 'evaluacion') {
          this.filtro = 2;
        } else if (filtroParam === 'asignadas') {
          this.filtro = 3;
        }


        this.obtenerSolicitudes();
        this.idProponente = parseInt(this.route.snapshot.params["id"]);
        this.verificarProponenteExiste();
        this.subscription.add(querySubscription);
      })      
  }

  verificarProponenteExiste() {
    if (this.idProponente) {
      this.proponenteDepartamentoService.obtenerProponente(this.idProponente).subscribe((data) => {
        //console.log("existe el proponente");
      },
        (err) => {
          console.log("no existe el proponente");
          this.router.navigate(["/home"]);
        })
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerSolicitudes() {
    this.solicitudes = [];
    
    this.solicitudService.GetRecordList(this.filtro).subscribe(solicitudes => {
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