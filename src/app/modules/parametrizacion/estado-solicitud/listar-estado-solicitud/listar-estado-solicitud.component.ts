import { Component, OnInit } from '@angular/core';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';
import { EstadoSolicitudService } from 'src/app/servicios/parametros/estado-solicitud.service';

@Component({
  selector: 'app-listar-estado-solicitud',
  templateUrl: './listar-estado-solicitud.component.html',
  styleUrls: ['./listar-estado-solicitud.component.css']
})
export class ListarEstadoSolicitudComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: EstadoSolicitudModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private service: EstadoSolicitudService
  ) { }

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
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: EstadoSolicitudModel) =>{
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
  }

}
