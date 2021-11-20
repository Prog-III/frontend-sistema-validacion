import { Component, OnInit } from '@angular/core';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CorreoNotificacionModel } from 'src/app/models/parametros/correo-notificacion.model';
import { CorreoNotificacionService } from 'src/app/servicios/parametros/correo-notificacion.service';

@Component({
  selector: 'app-listar-correos-notificacion',
  templateUrl: './listar-correos-notificacion.component.html',
  styleUrls: ['./listar-correos-notificacion.component.css']
})
export class ListarCorreosNotificacionComponent implements OnInit {
  
  recordList: CorreoNotificacionModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private service: CorreoNotificacionService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: CorreoNotificacionModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: CorreoNotificacionModel) =>{
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
