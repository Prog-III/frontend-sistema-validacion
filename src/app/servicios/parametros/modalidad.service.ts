import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  

  url: string = GeneralData.MS_NEGOCIO_URL;
  token: any
  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem("session-info") || '{}')
   }

  GetRecordList(): Observable<ModalidadModel[]>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ModalidadModel[]>(`${this.url}/modalidades`,httpOptions);
  }

  GuardarRegistro(data: ModalidadModel): Observable<ModalidadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.post<ModalidadModel>(`${this.url}/modalidades`,{
      nombre: data.nombre
    },httpOptions);
  }

  BuscarRegistro(id: number): Observable<ModalidadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.get<ModalidadModel>(`${this.url}/modalidades/${id}`,httpOptions)
  }

  EditarRegistro(data: ModalidadModel): Observable<ModalidadModel>{
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token.token}` 
    })}

    return this.http.put<ModalidadModel>(`${this.url}/modalidades/${data.id}`,{
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

    return this.http.delete(`${this.url}/modalidades/${id}`,httpOptions);
  }
}
