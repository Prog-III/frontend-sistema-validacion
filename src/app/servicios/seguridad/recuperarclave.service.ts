import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RecuperarClaveModel } from 'src/app/models/seguridad/recuperarclave.model';

@Injectable({
  providedIn: 'root'
})
export class RecuperarclaveService {
  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }


  GuardarRegistro(data: RecuperarClaveModel): Observable<RecuperarClaveModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}
        
    return this.http.post<RecuperarClaveModel>(`${this.url}/recuperar-clave`, JSON.stringify(data) ,httpOptions);
  }
}
