import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus,faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';


@Component({
  selector: 'app-listar-tipo-vinculacion',
  templateUrl: './listar-tipo-vinculacion.component.html',
  styleUrls: ['./listar-tipo-vinculacion.component.css']
})
export class ListarTipoVinculacionComponent implements OnInit {

  recordList: ModalidadModel[] = [];
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  id: number= 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TipoVinculacionService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList(){
    this.service.GetRecordList().subscribe({
      next: (data: TipoVinculacionModel[]) =>{
        this.recordList = data;
      }
    })
  }

  EliminarRegistro(id: number | undefined){
    if(id){
      this.service.EliminarRegistro(id).subscribe({
        next: (data: TipoVinculacionModel) =>{
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
