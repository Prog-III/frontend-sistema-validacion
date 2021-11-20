import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';

@Component({
  selector: 'app-listar-comite',
  templateUrl: './listar-comite.component.html',
  styleUrls: ['./listar-comite.component.css']
})
export class ListarComiteComponent implements OnInit {

  recordList: ComiteModel[] = [];


  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ComiteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: ComiteModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
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
  }

}
