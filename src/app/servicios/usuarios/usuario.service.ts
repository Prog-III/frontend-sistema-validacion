import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { CountModel } from 'src/app/models/reportes/count.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = GeneralData.MS_SEGUIRIDAD_URL;
  token: any

  constructor(private http: HttpClient) { 
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
  }

  ObtenerCantidadActivos(): Observable<CountModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    let estado = true
    let urlGet = `${this.url}/usuarios/count?where[estado]=${estado}`
    

    return this.http.get<CountModel>(urlGet,httpOptions);
  }

  ObtenerCantidadInactivos(): Observable<CountModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}`
    })}

    let estado = false
    let urlGet = `${this.url}/usuarios/count?where[estado]=${estado}`
    

    return this.http.get<CountModel>(urlGet,httpOptions);
  }
}
