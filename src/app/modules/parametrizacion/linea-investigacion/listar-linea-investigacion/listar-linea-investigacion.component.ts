import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion.service';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/servicios/modal/modal.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { ModalData } from 'src/app/models/compartido/modal-data';
@Component({
  selector: 'app-listar-linea-investigacion',
  templateUrl: './listar-linea-investigacion.component.html',
  styleUrls: ['./listar-linea-investigacion.component.css']
})
export class ListarLineaInvestigacionComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: LineaInvestigacionModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private toastService: ToastService,
    private service: LineaInvestigacionService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: LineaInvestigacionModel[]) =>{
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
          next: (data: LineaInvestigacionModel) => {

            const mensajeToast: ToastData = {
              tipo: 'success',
              mensaje: GeneralData.TOAST_MENSAJE_ELIMINACION('La Linea de Investigación')
            }
            this.toastService.openToast(mensajeToast);
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/parametrizacion/listar-linea-investigacion']))
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err: any) => {
            const mensajeToast: ToastData = {
              tipo: 'error',
              mensaje: GeneralData.TOAST_ERROR_ELIMINACION('La Linea de Investigación ')
            }
            this.toastService.openToast(mensajeToast);
          }
        });
      }
    })
    this.subscription.add(modalSubscription);
  }
}
