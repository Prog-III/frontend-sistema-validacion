
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { GeneralData } from 'src/app/config/general-data';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';


@Component({
  selector: 'app-listar-tipo-solicitud',
  templateUrl: './listar-tipo-solicitud.component.html',
  styleUrls: ['./listar-tipo-solicitud.component.css']
})
export class ListarTipoSolicitudComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: TipoSolicitudModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TipoSolicitudService,
    private cargarService: CargaArchivosService,
    private modalService: ModalService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: TipoSolicitudModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
  }

  descarga(id: any) {

    let url = 'http://localhost:3000/descargar_archivos_azure/' + id;

    window.open(url);

  }
  EliminarRegistro(id: number | undefined) {
    const mensajeModal: ModalData = {
      header: GeneralData.ARG_ELIMINACION,
      body: GeneralData.CONFIRMACION_ELIMINACION,
      esModalConfirmacion: true
    };
    const modalSubscription = this.modalService.openModal(mensajeModal)?.subscribe(confirmacion => {
      if (id && confirmacion) {
        this.service.EliminarRegistro(id).subscribe({
          next: (data: TipoSolicitudModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-tipo-solicitud']))
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El tipo de solicitud')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
  }
}



