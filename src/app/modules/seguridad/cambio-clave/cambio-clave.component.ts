import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { ToastData } from 'src/app/models/compartido/toast-data';
import { CambioClaveModel } from 'src/app/models/seguridad/cambioclave.model';
import { ToastService } from 'src/app/servicios/toast/toast.service';
import { GeneralData } from 'src/app/config/general-data';
import { CambioclaveService } from 'src/app/servicios/seguridad/cambioclave.service';
import { TokenModel } from 'src/app/models/seguridad/token.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.scss']
})
export class CambioClaveComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});
  faAsterisk = faAsterisk;
  public idusuario: string = "";
 
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private service: CambioclaveService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();

    let token = JSON.parse(localStorage.getItem("session-info") || '{}')
    this.ObjetoToken(token.token).subscribe({
      next: (data: TokenModel) => { 
        if(data.data?.id) this.idusuario = data.data?.id    
      },
        error: (err:any)=>{
          console.log("error");
          
        }
      });
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      claveactual: ['', [Validators.required]],
      clave_nueva: ['', 
      [
        Validators.required, 
        Validators.minLength(GeneralData.CLAVE_MIN_LONGITUD)
      ]],
      clave_confir: ['', 
      [
        Validators.required,
        Validators.minLength(GeneralData.CLAVE_MIN_LONGITUD),
      ]]
    });
  }

  CrearRegistro(){
    let model = new CambioClaveModel();
    
    if(this.formulario.controls['clave_nueva'].value === this.formulario.controls['clave_confir'].value){
      model.id_usuario = this.idusuario;
      model.clave_actual = MD5(this.formulario.controls['claveactual'].value).toString() ;
      model.nueva_clave = this.formulario.controls['clave_nueva'].value;
      this.service.GuardarRegistro(model).subscribe({
        next: (data: CambioClaveModel) => {            
          const mensajeToast: ToastData = {
            tipo: 'success',
            mensaje: GeneralData.TOAST_MENSAJE_CREACION('La contraseña')
          }
          this.toastService.openToast(mensajeToast);
          this.router.navigate(["/home"]);
        },
        error: (err:any)=>{
          const mensajeToast: ToastData = {
            tipo: 'error',
            mensaje: GeneralData.TOAST_ERROR_CREACION('La contraseña')
          }
          this.toastService.openToast(mensajeToast);
        }
      });
    } else{
      const mensajeToast: ToastData = {
        tipo: 'error',
        mensaje: 'Las claves no coinciden'
      }
      this.toastService.openToast(mensajeToast);
    }
    

  }

  ObjetoToken(token: string): Observable<TokenModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    })}

    return this.http.post<TokenModel>(`http://localhost:3002/verificar-token`, JSON.stringify(token) ,httpOptions);
    
  }
}
