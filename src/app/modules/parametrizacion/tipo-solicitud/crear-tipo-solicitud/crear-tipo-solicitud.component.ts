import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/servicios/compartidos/local-storage.service';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { TipoSolicitudService } from 'src/app/servicios/parametros/tipo-solicitud.service';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipoSolicitud.model';


@Component({
  selector: 'app-crear-tipo-solicitud',
  templateUrl: './crear-tipo-solicitud.component.html',
  styleUrls: ['./crear-tipo-solicitud.component.css']
})
export class CrearTipoSolicitudComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private service: TipoSolicitudService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      formato: ['', [Validators.required]]
    });
  }

  CrearRegistro(){
    let model = new TipoSolicitudModel();
    model.nombre = this.formulario.controls['nombre'].value;
    model.formato = this.formulario.controls['formato'].value;
    this.service.GuardarRegistro(model).subscribe({
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
