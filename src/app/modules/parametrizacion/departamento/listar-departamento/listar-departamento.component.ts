import { Component, OnInit } from '@angular/core';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { DepartamentoModel } from 'src/app/models/parametros/departamento.model';
import { DepartamentoService } from 'src/app/servicios/parametros/departamento.service';

@Component({
  selector: 'app-listar-departamento',
  templateUrl: './listar-departamento.component.html',
  styleUrls: ['./listar-departamento.component.css']
})
export class ListarDepartamentoComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: DepartamentoModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private service: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.total = this.recordList.length
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: DepartamentoModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: DepartamentoModel) =>{
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
