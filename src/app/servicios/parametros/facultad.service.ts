import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { FacultadModel } from 'src/app/models/parametros/facultad.model';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<FacultadModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<FacultadModel[]>(`${this.url}/facultades`,httpOptions);
  }

  GuardarRegistro(data: FacultadModel): Observable<FacultadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<FacultadModel>(`${this.url}/facultades`,{
      nombre: data.nombre,
      codigo: data.codigo
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<FacultadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<FacultadModel>(`${this.url}/facultades/${id}`,httpOptions)
  }

  EditarRegistro(data: FacultadModel): Observable<FacultadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<FacultadModel>(`${this.url}/facultades/${data.id}`,{
      id: data.id,
      nombre: data.nombre,
      codigo: data.codigo
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/facultades/${id}`,httpOptions);
  }
}