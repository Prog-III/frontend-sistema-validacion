import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { ModalData } from '../../../../models/compartido/modal-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-comite',
  templateUrl: './listar-comite.component.html',
  styleUrls: ['./listar-comite.component.css']
})
export class ListarComiteComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: ComiteModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private service: ComiteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: ComiteModel[]) =>{
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    const mensajeModal: ModalData = {
      header: "Eliminación",
      body: "¿Seguro que desea eliminar el registro?",
      esModalConfirmacion: true
    };

    const modalSubscription = this.modalService.openModal(mensajeModal)?.subscribe(confirmacion => {
      if(id && confirmacion){
        this.service.EliminarRegistro(id).subscribe({
          next: (data: ComiteModel) =>{
            //aqui va el modal
            console.log("Se elimino el mensaje");
            location.reload();
          },
          error: (err:any)=>{
            //modal de error
            console.log("No se elimino");
          }
        });
      }
    });
    
    this.subscription.add(modalSubscription);
  }

}
