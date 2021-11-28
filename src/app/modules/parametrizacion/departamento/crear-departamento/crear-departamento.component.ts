import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { GeneralData } from 'src/app/config/general-data';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { DepartamentoModel } from 'src/app/models/parametros/departamento.model';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';
import { DepartamentoService } from 'src/app/servicios/parametros/departamento.service';
import { FacultadService } from 'src/app/servicios/parametros/facultad.service';
import { ToastService } from 'src/app/servicios/toast/toast.service';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {

  recordList: FacultadModel[] = [];
  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartamentoService,
    private toastService: ToastService,
    private serviceFacultad: FacultadService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.GetRecordList();
  }

  GetRecordList(){
    this.serviceFacultad.GetRecordList().subscribe({
      next: (data: FacultadModel[]) =>{
        this.recordList = data;
      }
    })
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      id_facultad: [Number, [Validators.required]],
    });
    this.formulario.get('id_facultad')?.setValue("")
  }

  CrearRegistro(){
    let model = new DepartamentoModel();
   
    model.id_facultad = parseInt(this.formulario.controls['id_facultad'].value);
    model.nombre = this.formulario.controls['nombre'].value;
    this.service.GuardarRegistro(model).subscribe({
      next: (data: DepartamentoModel) =>{
        const mensajeToast: ToastData = {
          tipo: 'success',
          mensaje: GeneralData.TOAST_MENSAJE_CREACION('El departamento')
        }
        this.toastService.openToast(mensajeToast);
        this.router.navigate(["/parametrizacion/listar-departamento"]);
      },
      error: (err:any)=>{
        const mensajeToast: ToastData = {
          tipo: 'error',
          mensaje: GeneralData.TOAST_ERROR_CREACION('El departamento')
        }
        this.toastService.openToast(mensajeToast);
      }
    });

  }

}
