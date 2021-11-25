import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo_Vinculacion.model';
import { TipoVinculacionService } from 'src/app/servicios/parametros/tipo-vinculacion.service';
@Component({
  selector: 'app-eliminar-tipo-vinculacion',
  templateUrl: './eliminar-tipo-vinculacion.component.html',
  styleUrls: ['./eliminar-tipo-vinculacion.component.css']
})
export class EliminarTipoVinculacionComponent implements OnInit {
  id: number = 0;
  nombre: string = "";
  constructor(
    private router: Router,
    private service: TipoVinculacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: TipoVinculacionModel) => {
        if (data.id && data.nombre) {
          this.id = data.id
          this.nombre = data.nombre
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: TipoVinculacionModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-tipo-vinculacion"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }


}
