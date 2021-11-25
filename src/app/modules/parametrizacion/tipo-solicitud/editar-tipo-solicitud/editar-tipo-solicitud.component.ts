import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';

@Component({
  selector: 'app-editar-tipo-solicitud',
  templateUrl: './editar-tipo-solicitud.component.html',
  styleUrls: ['./editar-tipo-solicitud.component.css']
})
export class EditarTipoSolicitudComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      formato: ['', [Validators.required]]

    });
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: TipoSolicitudModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
        this.formulario.controls["formato"].setValue(data.formato)
      }
    });
  }

  CrearRegistro(){
    let model = new TipoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    model.formato = this.formulario.controls['formato'].value;

  
    this.service.EditarRegistro(model).subscribe({
      next: (data: TipoSolicitudModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-tipo-solicitud"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }
}
