import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estadosolicitud.model';
import { EstadoSolicitudService } from 'src/app/servicios/parametros/estado-solicitud.service';

@Component({
  selector: 'app-crear-estado-solicitud',
  templateUrl: './crear-estado-solicitud.component.html',
  styleUrls: ['./crear-estado-solicitud.component.css']
})
export class CrearEstadoSolicitudComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EstadoSolicitudService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new EstadoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: EstadoSolicitudModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-estado-solicitud"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }

}
