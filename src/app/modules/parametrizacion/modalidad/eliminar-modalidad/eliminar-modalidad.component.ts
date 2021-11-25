import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/servicios/parametros/modalidad.service';


@Component({
  selector: 'app-eliminar-modalidad',
  templateUrl: './eliminar-modalidad.component.html',
  styleUrls: ['./eliminar-modalidad.component.css']
})
export class EliminarModalidadComponent implements OnInit {

  id: number = 0;
  nombre: string = "";
  constructor(
    private router: Router,
    private service: ModalidadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: ModalidadModel) => {
        if (data.id && data.nombre) {
          this.id = data.id
          this.nombre = data.nombre
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: ModalidadModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-modalidad"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }


}
