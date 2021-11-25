import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion.service';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-listar-linea-investigacion',
  templateUrl: './listar-linea-investigacion.component.html',
  styleUrls: ['./listar-linea-investigacion.component.css']
})
export class ListarLineaInvestigacionComponent implements OnInit {

  recordList: LineaInvestigacionModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LineaInvestigacionService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: LineaInvestigacionModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: LineaInvestigacionModel) =>{
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
