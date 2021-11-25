
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CargaArchivosService } from 'src/app/servicios/compartidos/carga-archivos.service';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-listar-tipo-solicitud',
  templateUrl: './listar-tipo-solicitud.component.html',
  styleUrls: ['./listar-tipo-solicitud.component.css']
})
export class ListarTipoSolicitudComponent implements OnInit {

  pageSize: number = GeneralData.RECORDS_BY_PAGE;
  p: number = 1;
  total:number = 0;
  recordList: TipoSolicitudModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TipoSolicitudService,
    private cargarService: CargaArchivosService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: TipoSolicitudModel[]) =>{
        this.recordList = data;
        this.total = this.recordList.length
      }
    })
  }

  descarga(id:any){
    console.log(id);
    
    this.cargarService.GetRecordList(id).subscribe({
      next: (data: any) =>{
        console.log(data);
        let url = window.URL.createObjectURL(data);
    window.open(url);
        
      }
    })
  }
  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: TipoSolicitudModel) =>{
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
