import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-listar-jurado',
  templateUrl: './listar-jurado.component.html',
  styleUrls: ['./listar-jurado.component.css']
})
export class ListarJuradoComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: JuradoModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number = 0;

  constructor(
    private service: JuradoService,
    private modalService: ModalService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
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
          next: (data: JuradoModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El jurado')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-jurado']))
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El jurado')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
  }


}
