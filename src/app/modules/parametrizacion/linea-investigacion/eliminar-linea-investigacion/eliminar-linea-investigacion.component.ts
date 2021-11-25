import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Linea_InvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';
import { LineaInvestigacionService } from 'src/app/servicios/parametros/linea-investigacion-service';

@Component({
  selector: 'app-eliminar-linea-investigacion',
  templateUrl: './eliminar-linea-investigacion.component.html',
  styleUrls: ['./eliminar-linea-investigacion.component.css']
})
export class EliminarLineaInvestigacionComponent implements OnInit {

  id: number = 0;
  nombre: string = "";
  constructor(
    private router: Router,
    private service: LineaInvestigacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: Linea_InvestigacionModel) => {
        if (data.id && data.nombre) {
          this.id = data.id
          this.nombre = data.nombre
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: Linea_InvestigacionModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-linea-investigacion"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }


}
