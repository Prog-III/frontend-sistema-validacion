import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';

@Component({
  selector: 'app-editar-facultad',
  templateUrl: './editar-facultad.component.html',
  styleUrls: ['./editar-facultad.component.css']
})
export class EditarFacultadComponent implements OnInit {
  faAsterisk = faAsterisk;
 
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]]
    });
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: FacultadModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["codigo"].setValue(data.codigo)
        this.formulario.controls["nombre"].setValue(data.nombre)
      }
    });
  }

  CrearRegistro(){
    let model = new FacultadModel();
    model.codigo = this.formulario.controls['codigo'].value;
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    this.service.EditarRegistro(model).subscribe({
      next: (data: FacultadModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-facultad"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }
}
