import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';

import { LineaInvestigacionModel } from 'src/app/models/parametros/linea_investigacion.model';


@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionService {

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<LineaInvestigacionModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<LineaInvestigacionModel[]>(`${this.url}/lineas-investigacion`, httpOptions);
  }

  GuardarRegistro(data: LineaInvestigacionModel): Observable<LineaInvestigacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<LineaInvestigacionModel>(`${this.url}/lineas-investigacion`,{
      nombre: data.nombre
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<LineaInvestigacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<LineaInvestigacionModel>(`${this.url}/lineas-investigacion/${id}`,httpOptions)
  }

  EditarRegistro(data: LineaInvestigacionModel): Observable<LineaInvestigacionModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<LineaInvestigacionModel>(`${this.url}/lineas-investigacion/${data.id}`,{
      id: data.id,
      nombre: data.nombre
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/lineas-investigacion/${id}`,httpOptions);
  }
}
