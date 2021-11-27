import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { EstadoSolicitudService } from 'src/app/servicios/parametros/estado-solicitud.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-listar-estado-solicitud',
  templateUrl: './listar-estado-solicitud.component.html',
  styleUrls: ['./listar-estado-solicitud.component.css']
})
export class ListarEstadoSolicitudComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: EstadoSolicitudModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private service: EstadoSolicitudService,
    private modalService: ModalService,
    private toastService: ToastService,
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: EstadoSolicitudModel[]) =>{
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    const mensajeModal: ModalData = {
      header: GeneralData.ARG_ELIMINACION,
      body: GeneralData.CONFIRMACION_ELIMINACION,
      esModalConfirmacion: true
    };

    const modalSubscription = this.modalService.openModal(mensajeModal)?.subscribe(confirmacion => {
      if(id && confirmacion){
        this.service.EliminarRegistro(id).subscribe({
          next: (data: EstadoSolicitudModel) =>{
            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El estado de solicitud')
            }
            this.toastService.openToast(mensajeToast);

            this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=>this.router.navigate(['/parametrizacion/listar-estado-solicitud']))
          },
          error: (err:any)=>{
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El estado de solicitud')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
  }

}
