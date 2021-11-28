import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { Subscription } from 'rxjs';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-facultad',
  templateUrl: './listar-facultad.component.html',
  styleUrls: ['./listar-facultad.component.css']
})
export class ListarFacultadComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total: number = 0;
  recordList: FacultadModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number = 0;


  constructor(
    private service: FacultadService,
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
      next: (data: FacultadModel[]) => {
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
          next: (data: FacultadModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('La facultad')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-facultad']))
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('La facultad')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
  }
}



