import { Component, OnInit } from '@angular/core';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';

@Component({
  selector: 'app-listar-facultad',
  templateUrl: './listar-facultad.component.html',
  styleUrls: ['./listar-facultad.component.css']
})
export class ListarFacultadComponent implements OnInit {

  recordList: FacultadModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;


  constructor(
    private service: FacultadService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  
  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: FacultadModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: FacultadModel) =>{
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
