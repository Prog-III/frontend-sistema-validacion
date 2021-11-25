import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/servicios/parametros/comite.service';

@Component({
  selector: 'app-eliminar-comite',
  templateUrl: './eliminar-comite.component.html',
  styleUrls: ['./eliminar-comite.component.css']
})
export class EliminarComiteComponent implements OnInit {

  id: number = 0;
  nombre: string = "";
  constructor(
    private router: Router,
    private service: ComiteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: ComiteModel) => {
        if (data.id && data.nombre) {
          this.id = data.id
          this.nombre = data.nombre
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: ComiteModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-comite"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }


}
