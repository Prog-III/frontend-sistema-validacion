import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correo-notificacion.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { CorreoNotificacionService } from 'src/app/servicios/parametros/correo-notificacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-listar-correos-notificacion',
  templateUrl: './listar-correos-notificacion.component.html',
  styleUrls: ['./listar-correos-notificacion.component.css']
})
export class ListarCorreosNotificacionComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: CorreoNotificacionModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private service: CorreoNotificacionService,
    private modalService: ModalService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: CorreoNotificacionModel[]) =>{
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
          next: (data: CorreoNotificacionModel) =>{
            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El correo de notificación')
            }
            this.toastService.openToast(mensajeToast);

            this.router.navigateByUrl('/', {skipLocationChange: true})
            .then(()=>this.router.navigate(['/parametrizacion/listar-correos-notificacion']))
          },
          error: (err:any)=>{
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El correo de notificación')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
      }

}
