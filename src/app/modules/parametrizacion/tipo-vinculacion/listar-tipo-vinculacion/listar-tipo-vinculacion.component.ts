import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';


@Component({
  selector: 'app-listar-tipo-vinculacion',
  templateUrl: './listar-tipo-vinculacion.component.html',
  styleUrls: ['./listar-tipo-vinculacion.component.css']
})
export class ListarTipoVinculacionComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: ModalidadModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TipoVinculacionService,
    private modalService: ModalService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) =>{
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
      if (id && confirmacion) {
        this.service.EliminarRegistro(id).subscribe({
          next: (data: TipoVinculacionModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('El tipo de vinculacion')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-tipo-vinculacion']))
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('El tipo de vinculacion')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
  }


}
