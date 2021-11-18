import { Component, OnInit } from '@angular/core';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';

@Component({
  selector: 'app-listar-comite',
  templateUrl: './listar-comite.component.html',
  styleUrls: ['./listar-comite.component.css']
})
export class ListarComiteComponent implements OnInit {

  recordList: ComiteModel[] = [];



  constructor(
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

}
