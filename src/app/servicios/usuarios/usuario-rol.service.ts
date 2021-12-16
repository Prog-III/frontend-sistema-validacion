import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CountModel } from 'src/app/models/reportes/count.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any

  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
  }

  ObtenerCantidadJurados(): Observable<CountModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    let urlGet = `${this.url}/usuariorol/count?where[id_rol]=617ac07f522bb52fccc4ffcd`
    

    return this.http.get<CountModel>(urlGet,httpOptions);
  }
}
