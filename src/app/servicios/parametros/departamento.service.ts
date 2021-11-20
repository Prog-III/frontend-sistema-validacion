import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartamentoModel } from 'src/app/models/parametros/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<DepartamentoModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<DepartamentoModel[]>(`${this.url}/departamentos`,httpOptions);
  }

  GuardarRegistro(data: DepartamentoModel): Observable<DepartamentoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<DepartamentoModel>(`${this.url}/departamentos`,{
      nombre: data.nombre,
      id_facultad: data.id_facultad
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<DepartamentoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<DepartamentoModel>(`${this.url}/departamentos/${id}`,httpOptions)
  }

  EditarRegistro(data: DepartamentoModel): Observable<DepartamentoModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<DepartamentoModel>(`${this.url}/departamentos/${data.id}`,{
      id: data.id,
      nombre: data.nombre,
      id_facultad: data.id_facultad
    },httpOptions);
  }

  EliminarRegistro(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.delete(`${this.url}/departamentos/${id}`,httpOptions);
  }
}


