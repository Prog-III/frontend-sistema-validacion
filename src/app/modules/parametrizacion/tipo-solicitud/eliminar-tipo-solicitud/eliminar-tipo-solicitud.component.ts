import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';

@Component({
  selector: 'app-eliminar-tipo-solicitud',
  templateUrl: './eliminar-tipo-solicitud.component.html',
  styleUrls: ['./eliminar-tipo-solicitud.component.css']
})
export class EliminarTipoSolicitudComponent implements OnInit {

  id: number = 0;
  nombre: string = "";
  formato: string = "";
  constructor(
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: TipoSolicitudModel) => {
        if (data.id && data.nombre  && data.formato) {
          this.id = data.id
          this.nombre = data.nombre
          this.formato = data. formato
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: TipoSolicitudModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

}
}
