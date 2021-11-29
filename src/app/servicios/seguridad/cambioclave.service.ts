import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CambioClaveModel } from 'src/app/models/seguridad/cambioclave.model';

@Injectable({
  providedIn: 'root'
})
export class CambioclaveService {
  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }


  GuardarRegistro(data: CambioClaveModel): Observable<CambioClaveModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    console.log(data);
    
    return this.http.post<CambioClaveModel>(`${this.url}/cambiar-clave`,{
      id_usuario: data.id_usuario,
      clave_actual: data.clave_actual,
      nueva_clave: data.nueva_clave
    },httpOptions);
  }

}
