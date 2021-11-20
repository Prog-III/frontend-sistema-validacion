import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { DepartamentoModel } from 'src/app/models/parametros/departamento.model';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { DepartamentoService } from 'src/app/servicios/parametros/departamento.service';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';

@Component({
  selector: 'app-editar-departamento',
  templateUrl: './editar-departamento.component.html',
  styleUrls: ['./editar-departamento.component.css']
})
export class EditarDepartamentoComponent implements OnInit {

  faAsterisk = faAsterisk;
  recordList: FacultadModel[] = [];
  formulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartamentoService,
    private route: ActivatedRoute,
    private serviceFacultad: FacultadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.BuscarRegistro();
    this.GetRecordList();
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      id_facultad: [Number, [Validators.required]]
    });
  }

  BuscarRegistro(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.BuscarRegistro(id).subscribe({
      next:(data: DepartamentoModel) => {
        this.formulario.controls["id"].setValue(data.id)
        this.formulario.controls["nombre"].setValue(data.nombre)
        this.formulario.controls["id_facultad"].setValue(data.id_facultad)
      }
    });
  }

  CrearRegistro(){
    let model = new DepartamentoModel();
    model.id_facultad = parseInt(this.formulario.controls['id_facultad'].value);
    model.nombre = this.formulario.controls['nombre'].value;
    model.id = this.formulario.controls['id'].value;
    this.service.EditarRegistro(model).subscribe({
      next: (data: DepartamentoModel) =>{
        //aqui va el modal
        console.log("Se guardo el mensaje");
        this.router.navigate(["/parametrizacion/listar-departamento"]);
      },
      error: (err:any)=>{
        //modal de error
        console.log("No se almaceno");
      }
    });

  }

  GetRecordList(){
    this.serviceFacultad.GetRecordList().subscribe({
      next: (data: FacultadModel[]) =>{
        this.recordList = data;
      }
    })
  }

}
