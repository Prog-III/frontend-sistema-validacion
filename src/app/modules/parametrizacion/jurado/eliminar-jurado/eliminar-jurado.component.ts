import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/servicios/parametros/jurado.service';

@Component({
  selector: 'app-eliminar-jurado',
  templateUrl: './eliminar-jurado.component.html',
  styleUrls: ['./eliminar-jurado.component.css']
})
export class EliminarJuradoComponent implements OnInit {
  id: number = 0;
  nombre: string = "";
  email: string = "";
  telefono: string = "";
  entidad: string = "";

  constructor(
    private router: Router,
    private service: JuradoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuscarRegistro();
  }


  BuscarRegistro() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next: (data: JuradoModel) => {
        if (data.id && data.nombre && data.email && data.telefono && data.entidad ) {
          this.id = data.id
          this.nombre = data.nombre,
          this.email = data.email
          this.telefono = data.telefono
          this.entidad = data.entidad
          
        }
      }
    });
  }

  EliminarRegistro() {
    this.service.EliminarRegistro(this.id).subscribe({
      next: (data: JuradoModel) => {
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-jurado"]);
      },
      error: (err: any) => {
        //modal de error
        console.log("No se almaceno");
      }
    });

  }
}
